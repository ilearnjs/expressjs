const express = require('express');
const jwt = require('jsonwebtoken');

const dataStorage = require('../data/data-storage');
const secret = require('./../config').secret;

const router = express.Router();

const userStorage = dataStorage.users;

router.post('/signin', (req, res, next) => {
	const data = req.body;
	userStorage
		.get(data)
		.then((data) => res.json(generateToken(data)))
		.catch(err => next(err));
});

router.post('/signup', (req, res, next) => {
	const data = req.body;
	userStorage
		.create(data)
		.then((data) => res.json(generateToken(data)))
		.catch(err => next(err));
});

function generateToken(user) {
	const payload = {
		user: {
			id: user._id,
			name: user.name
		}
	};

	var token = jwt.sign(payload, secret, {
		expiresIn: 24 * 60 * 60 // seconds
	});

	return {
		token,
		user: {
			name: user.name
		}
	};
}

module.exports = router;
