const mongoose = require('mongoose');
const database = require('./../config').database;
mongoose.connect(database);

const PostsStorage = require('./posts-storage');
const UsersStorage = require('./users-storage');

const DataStorage = (function () {
	this.posts = new PostsStorage();
	this.users = new UsersStorage();
	return this;
})();

module.exports = DataStorage;