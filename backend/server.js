var express = require('express');
const path = require('path');
const fs = require('fs');
const port = 62020;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

require('dotenv').config();

/*--------------------
  Initialize Express
  --------------------*/
var app = express();

/*-----------------------
  Parse request content
  -----------------------*/
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', '*');
	res.header('Access-Control-Allow-Methods', '*');
	next();
});
app.use(
	bodyParser.urlencoded({
		extended: true,
		parameterLimit: 100000,
		limit: '50mb',
	})
);
app.use(
	bodyParser.json({ extended: true, parameterLimit: 100000, limit: '50mb' })
);
app.use(cookieParser());

/*--------
  Routes
  --------*/

// Index API Route
app.get('/', (req, res) => {
	var api_routes = '';
	api_routes += 'GET /' + '<br>';
	api_routes += 'GET /api' + '<br>';
	res.send('Available APIs:<br><br>' + api_routes);
});

// API routes
app.use('/api/v1', require('./api/v1/routes/index'));

/*---------------
  Server startup
  ---------------*/

var server = require('http').createServer(app);
server.listen(port, () => {
	let host = server.address().address;
	let port = server.address().port;
	console.log('Server is up and running at http://%s:%s', host, port);
});
