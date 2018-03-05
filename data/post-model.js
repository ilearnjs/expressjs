const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
	content: {
		type: String,
		required: true
	},
	user: { // TODO https://stackoverflow.com/a/18002078/5783475
		name: {
			type: String,
			required: true
		},
	}, 
	modifiedOn: {
		type: Date,
		required: true
	},
	createdOn: {
		type: Date,
		required: true
	}
});

const PostModel = mongoose.model('Post', postSchema);

module.exports = PostModel;