/* This is an ExpressJS app that responds to page requests by rendering Jade templates and responds to asynchronous JSON HTTP requests with info from the picpost database. */

var express = require('express'),
	http = require('http'),
	url = require('url'),
	path = require('path'),
	comprehension = require('./modules/require'),
	fs = require('fs'),
	mysql = require('mysql');

var db_connection = mysql.createConnection({
	host: 'localhost',
	database: 'picpost',
	user: 'picpost',
	password: 'ULSM8NpFNFTvUGrT'
});

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
	console.log("Express server listening on port " + app.get('port'));
});

// Routes

app.get('/', function(req, res) {
	res.render('index', {
		title: 'picpost'
	});
});

app.get('/gallery', function(req, res) {
	res.render('gallery', { // TODO: Create template.
		title: 'gallery'
	});
});

app.get('/image-list', function(req, res) { // Returns info on selected images as JSON.
	var params = url.parse(req.url, true).query;
	var image_batch_size = params.image_batch_size !== undefined? params.image_batch_size: 1;
	var offset = params.offset !== undefined? params.offset: 0;
	var direction = params.direction !== undefined && (params.direction === 'ASC' || params.direction === 'DESC')? params.direction: null;

	var settings = JSON.parse(fs.readFile(path.join(__dirname, '/settings.json')));
	var max_image_batch_size = settings.max_image_batch_size !== undefined? settings.max_image_batch_size: 100;

	var batch_size = Math.max(0, Math.min(image_batch_size, max_image_batch_size));
	
	var image_info = comprehension(batch_size, function(i) {
		connection.connect();
		connection.query(
			'SELECT * FROM images LIMIT ' +
			params.offset + ', ' + params.offset + batch_size +
			'ORDER BY ' + order + direction? ' ' + direction: '';
		)
		connection.end();
	});
	response.writeHead(200, {'Content-Type': 'application/json'});
	response.write(JSON.stringify(image_info));
});

app.get('/upload', function(req, res) {
	res.render('upload', {
		title: 'Upload an image.'
	});
});

app.post('/upload', function(req, res) {
	// Insert the image info in a record.
	connection.connect();
	connection.query(
		'INSERT INTO images SET ?',
		{
			title: req.body.title,
			description: req.body.description
		},
		function(error, result) {
			if(error) {
				connection.end();
				throw error;
			}

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

	res.render('upload', {
		title: 'Image uploaded. Upload another image.'
	});
});

app.get('/about', function(req, res){
	res.render('about', {
		title: 'About'
	});
});

