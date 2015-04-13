// Load required packages
var User = require('../models/user');
var logger = require('../common/logger');

// Create endpoint /api/users for POST
exports.postUsers = function(req, res) {
	var user = new User({
		username: req.body.username,
		password: req.body.password
	});

	user.save(function(err) {
		if (err) {
			logger.debug(err);
			res.send({
				message: "error on user save",
				error: err
			});
		}

		res.json({
			message: 'New player added to the locker room!'
		});
	});
};

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
	User.find(function(err, users) {
		if (err) {
			logger.debug(err);
			res.send({
				message: "error on user read",
				error: err
			});
		}

		res.json(users);
	});
};
