const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  text: {
    type: String,
  },
});

const NoteModel = mongoose.model("Note", NoteSchema);

module.exports = NoteModel;
