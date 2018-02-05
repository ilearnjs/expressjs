const express = require('express');
const dataStorage = require('../data/data-storage');
const router = express.Router();

const blogsStorage = dataStorage.blogs;

router.get('/', (req, res, next) => {
	const blogs = blogsStorage
		.read()
		.then((data) => res.json(data));
});

router.get('/:id', (req, res, next) => {
	const id = req.params.id;
	const blog = blogsStorage
		.read(id)
		.then((data) => res.json(data));
});

router.post('/', (req, res, next) => {
	const data = req.body;
	blogsStorage
		.create(data)
		.then(() => res.sendStatus(200));
});

router.put('/:id', (req, res, next) => {
	const id = req.params.id;
	const data = req.body;
	blogsStorage
		.update(id, data)
		.then(() => res.sendStatus(200));
});

router.delete('/:id', (req, res, next) => {
	const id = req.params.id;
	blogsStorage
		.delete(id)
		.then(() => res.sendStatus(200));
});

module.exports = router;
