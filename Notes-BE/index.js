require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { pool } = require("./config/db");

const app = express();
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

app.use(function (_req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH"
	);
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
	res.setHeader("Access-Control-Allow-Credentials", true);
	next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/json" }));

const userRoutes = require("./routes/user");
app.use("/api/user", userRoutes);

const noteRoutes = require("./routes/note");
app.use("/api/note", noteRoutes);

pool.connect((err, client, done) => {
	if (err) {
		console.error("Error connecting to the database", err);
		process.exit(1);
	} else {
		console.log("Connected to the PostgreSQL database");

		app.listen(process.env.NODE_PORT, () => {
			console.log("Server is running on port", process.env.NODE_PORT);
		});
	}
});
