const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  text: {
    type: String,
  },
  position: {
    type: Number,
  },
});

const NoteModel = mongoose.model("Note", NoteSchema);

module.exports = NoteModel;
