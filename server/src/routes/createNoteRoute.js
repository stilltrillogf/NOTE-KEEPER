const NoteModel = require("../models/NoteModel");

module.exports = async (req, res) => {
  const { text, title, position } = req.body;

  const note = new NoteModel({
    title,
    text,
    position,
  });
  const newNote = await note.save();
  res.json(newNote);
};
