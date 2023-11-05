const bcrypt = require("bcrypt");

const requestModel = require("../models/requestModel");
const { successMessage, errorMessage } = require("../utils/constant");
const { notesService } = require("../services/notes");

module.exports.noteController = {
	getNotes: async (req, res) => {
		if (req.user) {
			try {
				const allnotes = await notesService.getNotes();
				res.json(allnotes);
			} catch (error) {
				console.error("Error fetching notes:", error);
				res.status(500).json({ error: errorMessage.fetchNoteserror });
			}
		} else {
			res.json({ status: false, error: errorMessage.fetchNoteserror });
		}
	},
	getNote: async (req, res) => {
		const getNoteRequest = new requestModel.getNote(req);
		try {
			const note = await notesService.getNote(getNoteRequest);
			if (note?.length === 0) {
				res.status(404).json({ error: errorMessage.noteNotFound });
			} else {
				res.json(note[0]);
			}
		} catch (error) {
			console.error("Error fetching note:", error);
			res.status(500).json({ error: errorMessage.fetchNoteserror });
		}
	},
	addNote: async (req, res) => {
		if (req.user) {
			const addNotesRequest = new requestModel.addNotes(req);

			const requestContext = {
				...addNotesRequest,
				user_id: req.user.id,
			};

			try {
				const note = await notesService.addNote(requestContext);

				res.json({
					status: true,
					message: successMessage.noteAdded,
					note,
				});
			} catch (error) {
				res.json({ status: false, error: error });
			}
		} else {
			res.json({ status: false, error: errorMessage.addNoteFailed });
		}
	},
	updateNote: async (req, res) => {
		if (req.user) {
			const updateNoteRequest = new requestModel.getNote(req);
			const addNotesRequest = new requestModel.addNotes(req);
			try {
				const requestContext = {
					...addNotesRequest,
					...updateNoteRequest,
				};
				const note = await notesService.updateNote(requestContext);
				if (note.rows.length === 0) {
					res.status(404).json({ error: error });
				} else {
					res.json({
						status: true,
						message: successMessage.noteUpdated,
						note,
					});
				}
			} catch (error) {
				console.error("Error updating note:", error);
				res.status(500).json({ error: errorMessage.updateNoteError });
			}
		} else {
			res.json({ status: false, error: errorMessage.updateNoteError });
		}
	},
	deleteNote: async (req, res) => {
		if (req.user) {
			const deleteNoteRequest = new requestModel.getNote(req);
			try {
				const notes = await notesService.deleteNote(deleteNoteRequest);
				if (notes.rows.length === 0) {
					res.status(404).json({ error: errorMessage.noteNotFound });
				} else {
					res.json({
						status: true,
						message: successMessage.noteDeleted,
						notes: notes.rows[0],
					});
				}
			} catch (error) {
				console.error("Error deleting note:", error);
				res.status(500).json({ error: errorMessage.deleteNodeError });
			}
		} else {
			res.json({ status: false, error: errorMessage.deleteNodeError });
		}
	},
};
