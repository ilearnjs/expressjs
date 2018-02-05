const BlogModel = require('./blogs-model');

const BlogsStorage = function () {
}

BlogsStorage.prototype.read = function (id) {
	const query = id == null
		? BlogModel.find({})
		: BlogModel.findOne({ _id: id });

	return query.then((res, err) => {
		return res;
	});
}

BlogsStorage.prototype.create = function (data) {
	const blog = new BlogModel({
		createdOn: new Date(),
		modifiedOn: new Date(),
		title: data.title,
		content: data.content,
		author: data.author,
	});

	return BlogModel.create(blog);
}

BlogsStorage.prototype.update = function (id, data) {
	return BlogModel.findOneAndUpdate(
		{
			_id: id,
		},
		{
			modifiedOn: new Date(),
			title: data.title,
			content: data.content,
			author: data.author,

		}
	);
}

BlogsStorage.prototype.delete = function (id) {
	return BlogModel.findOneAndRemove({ _id: id });
}

module.exports = BlogsStorage;