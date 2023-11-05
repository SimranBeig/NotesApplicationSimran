const { pool } = require("../config/db");
const { sqlErrors, errorMessage } = require("../utils/constant");

module.exports.notesService = {
	getNotes: async () => {
		try {
			const result = await pool.query('SELECT * FROM "note"');
			return result.rows;
		} catch (error) {
			console.log("error=======", error);
			throw error;
		}
	},
	getNote: async (req) => {
		try {
			const result = await pool.query('SELECT * FROM "note" WHERE id = $1', [
				req.note_id,
			]);
			return result.rows;
		} catch (error) {
			console.log("error=======", error);
			throw error;
		}
	},
	addNote: async (req) => {
		try {
			const result = await pool.query(
				'INSERT INTO "note" (title, description, user_id) VALUES ($1, $2, $3) RETURNING id, title, description, user_id',
				[req.title, req.desc, req.user_id]
			);
			const note = result.rows[0];

			return note;
		} catch (error) {
			console.log("error=======", error);
			throw error;
		}
	},
	updateNote: async (req) => {
		try {
			const result = await pool.query(
				'UPDATE "note" SET title = $1, description = $2 WHERE id = $3 RETURNING *',
				[req.title, req.desc, req.note_id]
			);
			return result;
		} catch (error) {
			console.log("error=======", error);
			throw error;
		}
	},
	deleteNote: async (req) => {
		try {
			const result = await pool.query(
				'DELETE FROM "note" WHERE id = $1 RETURNING *',
				[req.note_id]
			);
			return result;
		} catch (error) {
			console.log("error=======", error);
			throw error;
		}
	},
};
