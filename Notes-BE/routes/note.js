const { noteController } = require("../controllers/notes");
const { authenticateJWT } = require("../middleware/authenticate");

const noteRouter = require("express").Router();

noteRouter.post("/note", authenticateJWT, noteController.addNote);
noteRouter.get("/notes", authenticateJWT, noteController.getNotes);
noteRouter.get("/note", authenticateJWT, noteController.getNote);
noteRouter.put("/note", authenticateJWT, noteController.updateNote);
noteRouter.delete("/note", authenticateJWT, noteController.deleteNote);

module.exports = noteRouter;
