const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogSchema = new Schema({
	title: String,
	content: String,
	author: String,
	modifiedOn: Date,
	createdOn: Date,
});

const BlogModel = mongoose.model('Blog', blogSchema);

module.exports = BlogModel;