const jwt = require('jsonwebtoken');
const UnauthenticatedError = require('../errors/unauthenticated');

const auth = async (req, res, next) => {
	// check header
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith('Bearer')) {
		throw new UnauthenticatedError('Authentication invalid');
	}
	console.log('hi here in teh auth section');

	const token = authHeader.split(' ')[1];
	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		// attach the user to the job routes
		req.user = { userId: payload.userId, name: payload.name };
		next();
	} catch (error) {
		console.log(error);
		throw new UnauthenticatedError('Authentication invalid okay');
	}
};

module.exports = auth;
