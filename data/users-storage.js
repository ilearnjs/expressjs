const bcrypt = require('bcryptjs');

const UserModel = require('./user-model');
const ServerError = require('./../models/server-error').ServerError;

const UsersStorage = function () {
}

UsersStorage.prototype.get = function (data) {
	const query = UserModel.findOne(
		{
			name: data.userName
		}
	);

	return query.then((res, err) => {
		if (res === null || !bcrypt.compareSync(data.password, res.password)) {
			throw new ServerError(`Incorrect Username/Password`);
		}

		return res;
	});
}

UsersStorage.prototype.create = function (data) {
	const user = new UserModel(
		{
			name: data.userName,
			password: bcrypt.hashSync(data.password, 8)
		}
	);

	return UserModel.create(user)
		.catch(ex => {
			if (ex.code === 11000) {
				throw new ServerError(`User with name "${user.name}" already exist`);
			}

			throw ex;
		});
}

module.exports = UsersStorage;