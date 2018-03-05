const PostModel = require('./post-model');

const PostsStorage = function () {
}

PostsStorage.prototype.read = function (id) {
	const query = id == null
		? PostModel.find({})
		: PostModel.findOne({ _id: id });

	return query.then((res, err) => {
		return res;
	});
}

PostsStorage.prototype.create = function (data) {
	const blog = new PostModel({
		createdOn: new Date(),
		modifiedOn: new Date(),
		content: data.content,
		user: data.user,
	});

	return PostModel.create(blog);
}

PostsStorage.prototype.update = function (id, data) {
	return PostModel.findOneAndUpdate(
		{
			_id: id,
		},
		{
			modifiedOn: new Date(),
			content: data.content,
			user: data.user,
		}
	);
}

PostsStorage.prototype.delete = function (id) {
	return PostModel.findOneAndRemove({ _id: id });
}

module.exports = PostsStorage;