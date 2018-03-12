const path = require('path');
const expressWinston = require('express-winston');
const winston = require('winston');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const ServerError = require('./models/server-error').ServerError;

const tokenVerification = require('./middlewares/tokenVerification');
const postsRoute = require('./routes/posts');
const userRoute = require('./routes/users');



app.use(cors({
	origin: 'http://localhost:8080', credentials: true
}));

app.use(cookieParser());
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