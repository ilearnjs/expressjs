const express = require('express');

const UnauthorizedError = require('./../models/server-error').UnauthorizedError;
const dataStorage = require('../data/data-storage');
const router = express.Router();

const postsStorage = dataStorage.posts;

router.get('/', (req, res, next) => {
	const posts = postsStorage
		.get()
		.then((data) => res.json(data))
		.catch(err => next(err));
});

router.get('/:id', (req, res, next) => {
	const id = req.params.id;
	const post = postsStorage
		.get(id)
		.then((data) => res.json(data))
		.catch(err => next(err));
});

router.get('/user/:userName', (req, res, next) => {
	const userName = req.params.userName;
	const post = postsStorage
		.getByUser(userName)
		.then((data) => res.json(data))
		.catch(err => next(err));
});

router.post('/', (req, res, next) => {
	const user = tryGetUser(req);
	const data = req.body;

	postsStorage
		.create(data, user)
		.then((data) => res.json(data))
		.catch(err => next(err));
});

router.put('/:id', (req, res, next) => {
	const user = tryGetUser(req);
	const id = req.params.id;
	const data = req.body;
	postsStorage
		.update(id, data, user)
		.then((data) => res.json(data))
		.catch(err => next(err));
});

router.delete('/:id', (req, res, next) => {
	const user = tryGetUser(req);
	const id = req.params.id;
	postsStorage
		.delete(id, user)
		.then(() => res.sendStatus(200))
		.catch(err => next(err));
});

function tryGetUser(req) {
	const user = req.decodedToken && req.decodedToken.user;

	if (!user) {
		throw new UnauthorizedError();
	}

	return user;
}

module.exports = router;
