const express = require("express");

const createNoteRoute = require("./routes/createNoteRoute");
const readNotesRoute = require("./routes/readNotesRoute");
const updateNoteRoute = require("./routes/updateNoteRoute");
const deleteNoteRoute = require("./routes/deleteNoteRoute");

const router = express.Router();

router.post("/notes", createNoteRoute);
router.get("/notes", readNotesRoute);
router.put("/notes/:id", updateNoteRoute);
router.delete("/notes/:id", deleteNoteRoute);

module.exports = router;
