const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
	content: String,
	user: String,
	modifiedOn: Date,
	createdOn: Date,
});

const BlogModel = mongoose.model('Blog', postSchema);

module.exports = BlogModel;