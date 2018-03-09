const express = require('express');
const dataStorage = require('../data/data-storage');
const router = express.Router();

const userStorage = dataStorage.users;

router.post('/signin', (req, res, next) => {
	const data = req.body;
	userStorage
		.get(data)
		.then((data) => res.json(data))
		.catch(err => res.status(500).json({ message: err.toString() }));
});

router.post('/signup', (req, res, next) => {
	const data = req.body;
	userStorage
		.create(data)
		.then((data) => res.json(data))
		.catch(err => res.status(500).json({ message: err.toString() }));
});

module.exports = router;
