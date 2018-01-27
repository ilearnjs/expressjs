const BlogsStorage = function () {
	this.maxId = 2;
	this.data = [
		{
			id: 1,
			createdOn: new Date(),
			modifiedOn: new Date(),
			title: 'First news',
			content: 'I\' the first news here!'
		},
		{
			id: 2,
			createdOn: new Date(),
			modifiedOn: new Date(),
			title: 'Routing',
			content: `Routing refers to how an application’s endpoints (URIs) respond to client requests. For an introduction to routing, see Basic routing.

			You define routing using methods of the Express app object that correspond to HTTP methods; for example, app.get() to handle GET requests and app.post to handle POST requests. For a full list, see app.METHOD. You can also use app.all() to handle all HTTP methods and app.use() to specify middleware as the callback function (See Using middleware for details).`
		}
	];
}

BlogsStorage.prototype.read = function (id) {
	if (id == null) {
		return this.data;
	}

	return getElementById(id, this.data);
}

BlogsStorage.prototype.create = function (data) {
	const blog = {
		id: ++this.maxId,
		createdOn: new Date(),
		modifiedOn: new Date(),
		title: data.title,
		content: data.content
	};

	this.data.push(blog);
}

BlogsStorage.prototype.update = function (id, data) {
	const blog = getElementById(id, this.data);
	blog.modifiedOn = new Date();
	blog.title = data.title;
	blog.content = data.content;
}

BlogsStorage.prototype.delete = function (id) {
	const index = getIndexById(id, this.data);
	this.data.splice(index, 1);
}

function getElementById(id, data) {
	const index = getIndexById(id, data);
	return data[index];
}

function getIndexById(id, data) {
	const index = data.findIndex(b => b.id == id);
	if (index === -1) {
		throw new Error(`Blog with id: ${id} is not found`);
	}

	return index;
}

module.exports = BlogsStorage;