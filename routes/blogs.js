const express = require('express');
const dataStorage = require('../data/data-storage');
const router = express.Router();

const blogsStorage = dataStorage.blogs;

router.get('/', (req, res, next) => {
	const blogs = blogsStorage.read();

	res.json(blogs);
});

router.get('/:id', (req, res, next) => {
	const id = req.params.id;
	const blog = blogsStorage.read(id);

	res.json(blog);
});

router.post('/', (req, res, next) => {
	const data = req.body;
	blogsStorage.create(data);

	res.sendStatus(200);
});

router.put('/:id', (req, res, next) => {
	const id = req.params.id;
	const data = req.body;
	blogsStorage.update(id, data);

	res.sendStatus(200);
});

router.delete('/:id', (req, res, next) => {
	const id = req.params.id;
	blogsStorage.delete(id);

	res.sendStatus(200);
});

module.exports = router;
