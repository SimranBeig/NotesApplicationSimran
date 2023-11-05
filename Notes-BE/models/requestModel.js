class registerUser {
	constructor(req) {
		this.first_name = req.body.first_name ? req.body.first_name : null;
		this.last_name = req.body.last_name ? req.body.last_name : null;
		this.username = req.body.username ? req.body.username : null;
		this.password = req.body.password ? req.body.password : null;
	}
}

class userLogin {
	constructor(req) {
		this.username = req.body.username ? req.body.username : null;
		this.password = req.body.password ? req.body.password : null;
	}
}

class addNotes {
	constructor(req) {
		this.title = req.body.title ? req.body.title : null;
		this.desc = req.body.desc ? req.body.desc : null;
	}
}

class getNote {
	constructor(req) {
		this.note_id = req.query.note_id ? req.query.note_id : null;
	}
}

module.exports.registerUser = registerUser;
module.exports.userLogin = userLogin;

module.exports.addNotes = addNotes;
module.exports.getNote = getNote;
