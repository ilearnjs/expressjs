const UserModel = require('./user-model');
const UserError = require('./../models/user-error');

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
		if (res === null) {
			throw new UserError(`User name/Password is incorrect`);
		}

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

	return UserModel.create(user)
		.catch(ex => {
			if (ex.code === 11000) {
				throw new UserError(`User with name "${user.name}" already exist`);
			}

			throw ex;
		});
}

module.exports = UsersStorage;