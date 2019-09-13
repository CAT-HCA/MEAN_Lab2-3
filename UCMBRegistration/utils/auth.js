const fs = require("fs");

var auth = {
	authorize: function(username, password) {
		var users = getUsers();
		var validUser = users.filter(user => {
			return user.username === username && user.password === password;
		});

		if (validUser.length === 1) {
			return true;
		}
		return false;
	}
};

var getUsers = () => {
	try {
		var usersString = fs.readFileSync("./data/users.json");
		var users = JSON.parse(usersString);
		return users;
	} catch (err) {
		return [];
	}
};

module.exports = {
	auth,
};