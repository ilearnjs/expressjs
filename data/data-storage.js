const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/posts-blog');

const PostsStorage = require('./posts-storage');
const UsersStorage = require('./users-storage');

const DataStorage = (function () {
	this.posts = new PostsStorage();
	this.users = new UsersStorage();
	return this;
})();

module.exports = DataStorage;