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
		.then((data) => res.json(getResponse(res, data)))
		.catch(err => next(err));
});

router.post('/signup', (req, res, next) => {
	const data = req.body;
	userStorage
		.create(data)
		.then((data) => res.json(getResponse(res, data)))
		.catch(err => next(err));
});

router.post('/signout', (req, res, next) => {
	res.clearCookie('token');
	res.clearCookie('user.name');
	res.sendStatus(200);
});

function getResponse(res, user) {
	const payload = {
		user: {
			id: user._id,
			name: user.name
		}
	};

	var token = jwt.sign(payload, secret, {
		expiresIn: 24 * 60 * 60 // seconds
	});

	res.cookie('token', token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
	res.cookie('user.name', user.name, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });

	return {
		user: {
			name: user.name
		}
	};
}

module.exports = router;
