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
  isPinned: {
    type: Boolean,
  },
});

const NoteModel = mongoose.model("notes", NoteSchema);

module.exports = NoteModel;
