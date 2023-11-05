const { pool } = require("../config/db");
const { sqlErrors, errorMessage } = require("../utils/constant");

module.exports.userService = {
	registerUser: async (req) => {
		try {
			const result = await pool.query(
				'INSERT INTO "user" (first_name, last_name, username, password) VALUES ($1, $2, $3, $4) RETURNING id, first_name, last_name, username, password',
				[req.first_name, req.last_name, req.username, req.hashedPassword]
			);
			const userData = result.rows[0];

			return userData;
		} catch (error) {
			let message;

			if ((error = sqlErrors.duplicateUsername)) {
				message = errorMessage.usernameExists;
			} else {
				message = errorMessage.registrationFailed;
			}
			throw message;
		}
	},

	userLogin: async (req) => {
		try {
			const result = await pool.query(
				'SELECT * FROM "user" WHERE username = $1',
				[req.username]
			);

			return result;
		} catch (error) {
			console.log("error=====", error);
			// let message;

			// if ((error = sqlErrors.duplicateUsername)) {
			// 	message = errorMessage.usernameExists;
			// } else {
			// 	message = errorMessage.registrationFailed;
			// }
			// throw message;
		}
	},
};
