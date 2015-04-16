var baseUrl = process.env.BASE_URL || 'localhost';

module.exports.baseUrl = baseUrl;
module.exports.port = process.env.PORT || 5000;

module.exports.mongoDbConnectString = process.env.MONGOLAB_URI ||
	'mongodb://localhost:27017/savageworlds';

module.exports.facebookClientID = process.env.FACEBOOK_CLIENTID || '1234';
module.exports.facebookClientSecret = process.env.FACEBOOK_CLIENTSECRET ||
	'abcd';
module.exports.facebookCallbackUrl = baseUrl + (process.env.FACEBOOK_CALLBACK ||
	'/');
