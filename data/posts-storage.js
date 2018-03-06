const PostModel = require('./post-model');

const PostsStorage = function () {
}

PostsStorage.prototype.get = function (id) {
	const query = id == null
		? PostModel.find({}).sort({ createdOn: -1 })
		: PostModel.findOne({ _id: id });

	return query.then((res, err) => {
		return res;
	});
}

PostsStorage.prototype.getByUser = function (userName) {
	const query = PostModel.find({ user: { name: userName } }).sort({ createdOn: -1 });

	return query.then((res, err) => {
		return res;
	});
}

PostsStorage.prototype.create = function (data) {
	const post = new PostModel({
		createdOn: new Date(),
		modifiedOn: new Date(),
		content: data.content,
		user: data.user,
	});

	return PostModel.create(post);
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