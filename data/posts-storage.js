const UnauthorizedError = require('../models/server-error').UnauthorizedError;
const GoneError = require('../models/server-error').GoneError;
const PostModel = require('./post-model');

const PostsStorage = function () {
}

PostsStorage.prototype.get = function () {
	return PostModel.find({}).sort({ createdOn: -1 })
		.then(posts => {
			return posts;
		});
}

PostsStorage.prototype.getById = function (id) {
	return PostModel.findById(id)
		.then(post => {
			if (!post) {
				throw new GoneError();
			}

			return post;
		});
}

PostsStorage.prototype.getByUser = function (userName) {
	return PostModel.find({ user: { name: userName } }).sort({ createdOn: -1 })
		.then(posts => {
			return posts;
		});
}

PostsStorage.prototype.create = function (data, user) {
	const post = new PostModel({
		createdOn: new Date(),
		modifiedOn: new Date(),
		content: data.content,
		user: user,
	});

	return PostModel.create(post);
}

PostsStorage.prototype.update = function (id, data, user) {
	return PostModel.findById(id)
		.then(post => {
			if (!post) {
				throw new GoneError();
			}

			if (post.user.name !== user.name) {
				throw new UnauthorizedError();
			}

			return post.update({
				modifiedOn: new Date(),
				content: data.content,
			});
		});
}

PostsStorage.prototype.delete = function (id, user) {
	return PostModel.findById(id)
		.then(post => {
			if (!post) {
				throw new GoneError();
			}

			if (post.user.name !== user.name) {
				throw new UnauthorizedError();
			}

			return post.remove();
		});
}

module.exports = PostsStorage;