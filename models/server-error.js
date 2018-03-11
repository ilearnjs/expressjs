function ServerError(message, code) {
	this.userMessage = message || 'Server error';
	this.code = code || 500;
}

function UnauthorizedError(message) {
	message = message || 'Unauthorized';
	ServerError.call(this, message, 401);
}

UnauthorizedError.prototype = Object.create(ServerError.prototype);
UnauthorizedError.prototype.constructor = UnauthorizedError;

function GoneError(message) {
	message = message || 'No longer available';
	ServerError.call(this, message, 410);
}

GoneError.prototype = Object.create(ServerError.prototype);
GoneError.prototype.constructor = GoneError;

module.exports.ServerError = ServerError;
module.exports.UnauthorizedError = UnauthorizedError;
module.exports.GoneError = GoneError;