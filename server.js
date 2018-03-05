const path = require('path');
const expressWinston = require('express-winston');
const winston = require('winston');
const express = require('express');
const app = express();

const postsRoute = require('./routes/posts');

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
app.use('/posts', postsRoute);

app.listen(3000, err => {
	if(err) {
		return console.error(err);
	}
});

module.exports = app;