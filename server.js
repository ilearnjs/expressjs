const path = require('path');
const expressWinston = require('express-winston');
const winston = require('winston');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const BearerStrategy = require('passport-http-bearer');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const cors = require('cors');

// const tokens = {};

const postsRoute = require('./routes/posts');
const userRoute = require('./routes/users');

app.use(cors({
	origin: '*',
	credentials: true
}));

app.use(express.json());

app.use(expressWinston.logger({
	transports: [
		new winston.transports.File({
			filename: 'log'
		})
	],
	meta: false
}));

app.use(express.json());
app.use('/posts', postsRoute);
app.use('/user', userRoute);

app.listen(3000, err => {
	if (err) {
		return console.error(err);
	}
});

module.exports = app;