const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blog');

const BlogsStorage = require('./blogs-storage');

const DataStorage = (function () {
	this.blogs = new BlogsStorage();

	return this;
})();

module.exports = DataStorage;