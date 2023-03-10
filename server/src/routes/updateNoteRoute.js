const NoteModel = require("../models/NoteModel");

module.exports = async (req, res) => {
  const { id } = req.params;
  const note = await NoteModel.findById(id);
  note.title = req.body.title;
  note.text = req.body.text;
  note.position = req.body.position;
  note.isPinned = req.body.isPinned;
  await note.save();
  res.json(note);
};
