const NoteModel = require("../models/NoteModel");

module.exports = async (req, res) => {
  const { id } = req.params;
  const note = await NoteModel.findById(id);
  note.title = req.body.title;
  note.text = req.body.text;
  await note.save();
  res.json(note);
};
