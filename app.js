const path = require('path');
const expressWinston = require('express-winston');
const winston = require('winston');
const express = require('express');
const app = express();

const blogsRoute = require('./routes/blogs');
const indexRoute = require('./routes/index');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(expressWinston.logger({
	transports: [
		new winston.transports.File({
			filename: 'log'
		})
	],
	meta: false,
	msg: '{{req.url}} {{req.timestamp}}',
}));

app.use(express.json());
app.use('/blogs', blogsRoute);
app.use('*', indexRoute);

module.exports = app;