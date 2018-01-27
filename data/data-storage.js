const BlogsStorage = require('./blogs-storage');

const DataStorage = (function () {
	this.blogs = new BlogsStorage();

	return this;
})();

module.exports = DataStorage;