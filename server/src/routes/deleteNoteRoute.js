const NoteModel = require("../models/NoteModel");

module.exports = async (req, res) => {
  const { id } = req.params;
  NoteModel.findByIdAndRemove(id, (err, note) =>
    err ? console.log(err) : res.status(200).send(note)
  );
};
