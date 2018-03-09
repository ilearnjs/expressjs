const UserModel = require('./user-model');

const UsersStorage = function () {
}

UsersStorage.prototype.get = function (data) {
	const query = UserModel.findOne(
		{
			name: data.userName,
			password: data.password
		}
	);

	return query.then((res, err) => {
		return res;
	});
}

UsersStorage.prototype.create = function (data) {
	const user = new UserModel(
		{
			name: data.userName,
			password: data.password
		}
	);

	return UserModel.create(user);
}

module.exports = UsersStorage;