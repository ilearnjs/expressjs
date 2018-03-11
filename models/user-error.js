function ServerError(message, code) {
	this.userMessage = message || 'Server error';
	this.code = code || 500;
}

module.exports = ServerError;