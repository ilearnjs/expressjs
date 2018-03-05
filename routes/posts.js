const express = require('express');
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
	const data = req.body;
	postsStorage
		.create(data)
		.then(() => res.sendStatus(200))
		.catch(err => next(err));
});

router.put('/:id', (req, res, next) => {
	const id = req.params.id;
	const data = req.body;
	postsStorage
		.update(id, data)
		.then(() => res.sendStatus(200));
});

router.delete('/:id', (req, res, next) => {
	const id = req.params.id;
	postsStorage
		.delete(id)
		.then(() => res.sendStatus(200))
		.catch(err => next(err));
});

module.exports = router;
