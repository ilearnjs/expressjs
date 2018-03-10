function ServerError(message, error) {
	this.userMessage = message || 'Server error';
	this.stack = (new Error()).stack;
	this.originalError = error;
}

module.exports = ServerError;