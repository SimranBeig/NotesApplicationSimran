const bcrypt = require("bcrypt");

const requestModel = require("../models/requestModel");
const { successMessage, errorMessage } = require("../utils/constant");
const { userService } = require("../services/user");
const { generateToken } = require("../middleware/authenticate");

module.exports.userController = {
	registerUser: async (req, res) => {
		const userRegisterRequest = new requestModel.registerUser(req);
		const hashedPassword = await bcrypt.hash(userRegisterRequest.password, 10);

		const requestContext = {
			...userRegisterRequest,
			hashedPassword: hashedPassword,
		};

		try {
			const userData = await userService.registerUser(requestContext);

			res.json({
				status: true,
				message: successMessage.registrationSuccessful,
				userData,
			});
		} catch (error) {
			res.json({ status: false, error: error });
		}
	},

	userLogin: async (req, res) => {
		const userLoginRequest = new requestModel.userLogin(req);

		try {
			const result = await userService.userLogin(userLoginRequest);

			if (result.rows.length === 0) {
				return res.status(404).json({ error: errorMessage.userNotFound });
			}

			const user = result.rows[0];
			const passwordMatch = await bcrypt.compare(
				userLoginRequest.password,
				user.password
			);

			if (!passwordMatch) {
				return res.status(401).json({ error: errorMessage.invalidPassword });
			}

			const token = generateToken(user);

			res.json({
				token,
				status: true,
				message: successMessage.loginSuccessful,
			});
		} catch (error) {
			res.status(500).json({ error: errorMessage.loginFailed });
		}
	},
};
