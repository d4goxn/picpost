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

//var db_info = JSON.parse(fs.readFile(path.join(__dirname, '/settings.json'))).db_info;
var db_info = {
	'host': 'localhost',
	'database': 'picpost',
	'user': 'picpost',
	'password': 'ULSM8NpFNFTvUGrT'
};

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
		console.log('Images: ', images);
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

app.get('/upload', function(req, res) {
	res.render('upload', {
		title: 'upload'
	});
});

app.post('/upload', function(req, res) {
	// Insert the image info in a record.
	var error = null;
	var connection = mysql.createConnection(db_info);
	connection.connect();
	connection.query(
		'INSERT INTO images SET ?',
		{
			title: req.body.title,
			description: req.body.description
		},
		function(error, result) {
			if(error) throw error;

			// Make a file name based on the record id, with the extension from the uploaded image.
			var filename = result.insertId + '.' + req.files.image.name.split('.').pop().toLowerCase();

			// Set the image filename in the new record.
			connection.query(
				'UPDATE images SET ? WHERE id=' + result.insertId,
				{filename: filename}
			);
			connection.end()

			// Save uploaded image to public/images/gallery
			fs.readFile(req.files.image.path, function(error, data) {
				var path = __dirname + '/public/images/gallery/' + filename;
				fs.writeFile(path, data, function(error) {
					// TODO: Decide what to do on the front end in response to a filesystem error.
					if(error) throw error;
				});
			});
		}
	);

	if(error === null) {
		res.render('upload', {
			title: 'upload',
			status: 'Image uploaded.'
		});
	} else {
		res.render('upload', {
			title: 'upload',
			status: String(error)
		});
	}
});

