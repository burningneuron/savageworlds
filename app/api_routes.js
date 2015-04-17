var isLoggedIn = require('./auth_routes.js').isLoggedIn;
var User = require('./models/user');

module.exports = {
	initialize: function(app) {
		app.get('/api/user', isLoggedIn, function(req, res) {
			User.findById(req.user.id, function(err, user) {
				res.send(user);
			});
		});
	}

};