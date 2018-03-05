const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blog');

const PostsStorage = require('./posts-storage');

const DataStorage = (function () {
	this.posts = new PostsStorage();

	return this;
})();

module.exports = DataStorage;