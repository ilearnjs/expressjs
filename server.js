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

const postsRoute = require('./routes/posts');
const userRoute = require('./routes/users');
const UserError = require('./models/user-error');

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

app.use((err, req, res, next) => {
	if (!(err instanceof UserError)) {
		err = new UserError('Server error', err);
	}
	
	res.status(500).json(err);
})

app.listen(3000);

module.exports = app;