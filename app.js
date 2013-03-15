/* This is an ExpressJS app that responds to page requests by rendering Jade templates and responds to asynchronous JSON HTTP requests with info from the picpost database. */

function fetch_images(callback) {
	// TODO: Add range selection and ordering functionality.
	var query = 'SELECT * FROM images';

	var images = [];

	var connection = mysql.createConnection(db_info);
	connection.connect();
	connection.query(query)
	.on('result', function(row) {
		images.push(row);
	})
	.on('end', function() {
		connection.end();
		callback(images);
	});
}

var express = require('express'),
	http = require('http'),
	url = require('url'),
	path = require('path'),
	fs = require('fs'),
	mysql = require('mysql'),
	vsprintf = require('sprintf').vsprintf;

var db_info;
if(process.env.VCAP_SERVICES) {
	var services = process.env.VCAP_SERVICES['mysql-5.1'];
	for(var i = 0; i < services.length; i++) {
		if(services[i].name == 'picpost') {
			credentials = services[i].credentials;
			db_info = {
				host: credentials.hostname,
				database: credentials.name,
				user: credentials.username,
				password: credentials.password
			};
		}
	}
} else {
	db_info = {
		'host': 'localhost',
		'database': 'picpost',
		'user': 'picpost',
		'password': 'ULSM8NpFNFTvUGrT'
	};
}

var app = express();
app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});

// Routes

app.get('/', function(req, res) {
	fetch_images(function(images) {
		res.render('index', {
			title: 'gallery',
			images: images
		});
	});
});

app.get('/fetch-images', function(req, res) { // Returns info on selected images as JSON.
	var params = url.parse(req.url, true).query;
	var image_batch_size = params.image_batch_size !== undefined? params.image_batch_size: 1;
	var offset = params.offset !== undefined? params.offset: 0;
	var direction = params.direction !== undefined && (params.direction === 'ASC' || params.direction === 'DESC')? params.direction: null;

	var settings = JSON.parse(fs.readFile(path.join(__dirname, '/settings.json')));
	var max_image_batch_size = settings.max_image_batch_size !== undefined? settings.max_image_batch_size: 100;

	var batch_size = Math.max(0, Math.min(image_batch_size, max_image_batch_size));
	var query = vsprintf(
		'SELECT * FROM images LIMIT %(start), %(end) ORDER BY %(order) %(direction)',
		{
			start: mysql.escape(offset),
			end: mysql.escape(offset + batch_size),
			order: mysql.escape(order),
			direction: direction? mysql.escape(direction): ''
		}
	);

	var image_list = [];

	var connection = mysql.createConnection(db_info);
	connection.connect();
	connection.query(query)
		.on('result', function(row) {
			image_info.push(row);
		})
		.on('end', function() {
			connection.end();
			response.writeHead(200, {'Content-Type': 'application/json'});
			response.write(JSON.stringify(image_list));
		});
});

app.post('/hit/:id', function(req, res) {
	// Increment the popularity of the identified image, if it exists.
	function respond() {
		connection.query(
			'SELECT * FROM images WHERE ?',
			{id: req.params.id},
			function(error, results) {
				//console.log(res.json(results[0].popularity));
				res.json(results[0].popularity);
				res.send();
				connection.end();
			}
		);
	}

	function handle_result(result) {
		if(result.affectedRows === 1) respond();
		else if (result.affectedRows === 0) {
			res.writeHead(404);
			res.send();
			connection.end();
		} else {
			res.writeHead(500);
			res.send();
			connection.end();
		}
	}

	var connection = mysql.createConnection(db_info);
	connection.connect();
	connection.query(
		'UPDATE images SET popularity = popularity + 1 WHERE ?',
		{id: req.params.id},
		function(error, result) {
			if(!error) {
				handle_result(result);
			} else {
				res.writeHead(500);
				res.send();
				connection.end();
				throw error;
			}
		}
	);
});

app.get('/upload', function(req, res) {
	res.render('upload', {
		title: 'upload'
	});
});

app.post('/upload', function(req, res) {
	var errors = [];

	// Thumbnailer
	function thumbnail(source, destination) {
		//var gm = require('gm');
		var im = require('imagemagick');
		im.resize(
			{
				srcPath: source,
				dstPath: destination,
				width: 200
			},
			function(error, stdout, stderr) {
				//if(error) errors.push(error);
				if(error) console.log('ImageMagick error: ' + error);
				else console.log('Resized ' + source + ' to a width of 200px.');
			}
		);
	}

	// Insert the image info in a record.
	var connection = mysql.createConnection(db_info);
	connection.connect();
	connection.query(
		'INSERT INTO images SET ?',
		{
			title: req.body.title,
			description: req.body.description
		},
		function(error, result) {
			if(!error) {
				// Make a file name based on the record id, with the extension from the uploaded image.
				var filename = String(result.insertId);
				var extension = req.files.image.name.split('.').pop().toLowerCase();
				var gallery_dir = path.join('public', 'images', 'gallery');
				var thumb_dir = path.join('public', 'images', 'thumbs');
				var gallery_path = path.join(gallery_dir, filename + '.' + extension);
				var thumb_path = path.join(thumb_dir, filename + '.' + extension);
				var gallery_src = ['images', 'gallery', filename + '.' + extension].join('/');
				var thumb_src = ['images', 'thumbs', filename + '.' + extension].join('/');

				// Set the image filename in the new record.
				connection.query(
					'UPDATE images SET ? WHERE id=' + result.insertId,
					{
						filename: gallery_src,
						thumb: thumb_src
					}
				);
				connection.end()

				// Save uploaded image to public/images/gallery
				fs.readFile(req.files.image.path, function(error, data) {
					if(!error) {
						console.log('Uploading ' + gallery_path + ' and thumbnailing to ' + thumb_path);
						fs.writeFile(gallery_path, data, function(error) {
							if(!error) {
								thumbnail(gallery_path, thumb_path);
							} else {
								errors.push(error);
							}
						});
					} else {
						errors.push(error);
					}
				});
			} else {
				errors.push(error);
			}
		}
	);

	if(!errors.length) {
		res.render('upload', {
			title: 'upload',
			status: req.files.image.name + ' was uploaded.'
		});
	} else {
		console.log(errors);
		res.render('upload', {
			title: 'upload',
			status: String(errors)
		});
	}
});

