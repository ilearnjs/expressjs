const jwt = require('jsonwebtoken');

const UnauthorizedError = require('./../models/server-error').UnauthorizedError;
const secret = require('./../config').secret;

const tokenVerifiaction = function (req, res, next) {
	var token = req.cookies.token;

	if (token) {
		try {
			const decodedToken = jwt.verify(token, secret);
			req.decodedToken = decodedToken;
		} catch (err) {
			if (err.name === 'TokenExpiredError') {
				throw new UnauthorizedError('Expired token');
			}

			throw new UnauthorizedError('Invalid token');
		}
	}

	next();
}

module.exports = tokenVerifiaction;