import React, { useState } from "react";
import styles from "../../styles/CreateNote.module.css";

export const CreateNote = ({ onCreateNote }) => {
  const [note, setNote] = useState(initialNote);
  const [isTakingANote, setIsTakingANote] = useState(false);

  const handleCreateNote = () => {
    if (note.text === "" && note.title === "") return;
    onCreateNote(note);
    setNote(initialNote);
  };

  return (
    <div className={styles.createNoteWrapper}>
      {isTakingANote ? (
        <div className={styles.createNoteActive}>
          <div className={styles.createNoteInputs}>
            <input
              placeholder="Title"
              type="text"
              value={note.title}
              onChange={(e) => {
                setNote({ ...note, title: e.target.value });
              }}
            />
            <textarea
              placeholder="Text"
              style={{ resize: "none" }}
              value={note.text}
              onChange={(e) => {
                setNote({ ...note, text: e.target.value });
              }}
            />
          </div>
          <button onClick={handleCreateNote}>+</button>
        </div>
      ) : (
        <div className={styles.createNoteNotActive}>
          <div
            onClick={() => {
              setIsTakingANote(true);
            }}
            className={styles.createNoteActivator}
          >
            Take a note...
          </div>
          <div>SHORTCUTS {"(templates etc)"}</div>
        </div>
      )}
    </div>
  );
};

const initialNote = {
  title: "",
  text: "",
};
