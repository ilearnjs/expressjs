const jwt = require('jsonwebtoken');

const UnauthorizedError = require('./../models/server-error').UnauthorizedError;
const secret = require('./../config').secret;

const tokenVerifiaction = function (req, res, next) {
	var token = req.headers['authorization'];

	if (token) {
		jwt.verify(token, secret, (err, decodedToken) => {
			if (err) {
				if (err.name === 'TokenExpiredError') {
					throw new UnauthorizedError('Expired token');
				}

				throw new UnauthorizedError('Invalid token');
			} else {
				req.decodedToken = decodedToken;
			}
		});
	}
	next();
}

module.exports = tokenVerifiaction;