const NoteModel = require("../models/NoteModel");

module.exports = async (req, res) => {
  const { text, title } = req.body;

  const note = new NoteModel({
    title,
    text,
  });
  const newNote = await note.save();
  res.json(newNote);
};
