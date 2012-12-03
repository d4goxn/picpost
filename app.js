
/**
 * Module dependencies.
 */

var express = require('express'),
	routes = require('./routes'),
	http = require('http'),
	fs = require('fs'),
	mysql = require('mysql'),
	path = require('path');

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

/*
app.get('/gallery', function(req, res) {
	res.render('gallery', { // TODO: Create template.
		title: 'gallery'
	});
});

app.get('/image-list', function(req, res) {
	var params = url.parse(req.url, true).query;
	response.writeHead(200, {'Content-Type': 'application/json'});
	response.write(JSON.stringify(image_list));
});

app.get('/image', function(req, res) {
});
*/

app.get('/upload', function(req, res) {
	res.render('upload', {
		title: 'Upload an image.'
	});
});

app.post('/upload', function(req, res) {
	var connection = mysql.createConnection({
		host: 'localhost',
		database: 'picpost',
		user: 'picpost',
		password: 'ULSM8NpFNFTvUGrT'
	});

	// Insert the image info in a record.
	connection.connect();
	connection.query(
		'INSERT INTO images SET ?',
		{
			title: req.body.title,
			description: req.body.description
		},
		function(error, result) {
			if(error) throw error;
			console.log(result);

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

