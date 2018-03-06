const express = require('express');
const dataStorage = require('../data/data-storage');
const router = express.Router();

const userStorage = dataStorage.users;

router.post('/', (req, res, next) => {
	const data = req.body;
	userStorage
		.get(data)
		.then((data) => res.json(data))
		.catch(err => next(err));
});

module.exports = router;
