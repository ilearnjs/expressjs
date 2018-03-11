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

const ServerError = require('./models/server-error').ServerError;

const tokenVerification = require('./middlewares/tokenVerification');
const postsRoute = require('./routes/posts');
const userRoute = require('./routes/users');



app.use(cors({
	origin: '*'
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

const router = express.Router();
router.use(tokenVerification);
router.use('/user', userRoute);
router.use('/posts', postsRoute);
app.use('/api', router);

app.use((err, req, res, next) => {
	if (!(err instanceof ServerError)) {
		err = new ServerError('Server error');
	}

	res.status(err.code).json(err);
})

app.listen(3000);

module.exports = app;