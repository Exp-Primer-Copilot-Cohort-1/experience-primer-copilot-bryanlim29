// Create web server

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'comment'
});

connection.connect();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/comment', function(req, res) {
	res.sendfile('index.html');
});

app.get('/comment/all', function(req, res) {
	connection.query('SELECT * FROM comment', function(err, rows, fields) {
		if (err) throw err;
		res.send(rows);
	});
});

app.post('/comment/add', function(req, res) {
	var name = req.body.name;
	var comment = req.body.comment;
	var date = new Date();
	var time = date.getTime();
	connection.query('INSERT INTO comment (name, comment, time) VALUES (?, ?, ?)', [name, comment, time], function(err, rows, fields) {
		if (err) throw err;
		res.send(rows);
	});
});

app.post('/comment/delete', function(req, res) {
	var id = req.body.id;
	connection.query('DELETE FROM comment WHERE id = ?', [id], function(err, rows, fields) {
		if (err) throw err;
		res.send(rows);
	});
});

app.listen(8888, function() {
	console.log('Server is running on port 8888');
});
