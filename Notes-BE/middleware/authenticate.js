const jwt = require("jsonwebtoken");
const { errorMessage } = require("../utils/constant");
const secretKey = process.env.JWT_SECRET_KEY;

module.exports.authenticateJWT = (req, res, next) => {
	const token = req.header("Authorization");

	if (!token) {
		return res.status(401).json({ error: errorMessage.authorizationFailed });
	}

	jwt.verify(token, secretKey, (err, decoded) => {
		if (err) {
			return res.status(403).json({ error: errorMessage.invalidToken });
		}

		req.user = decoded;
		next();
	});
};

module.exports.generateToken = (user) => {
	try {
		const token = jwt.sign(
			{ id: user.id, username: user.username },
			secretKey,
			{
				expiresIn: "1h",
			}
		);
		return token;
	} catch (error) {
		throw error;
	}
};
