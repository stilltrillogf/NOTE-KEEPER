import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/CreateNote.module.css";

export const CreateNote = ({ onCreateNote }) => {
  const [note, setNote] = useState(initialNote);
  const [isTakingANote, setIsTakingANote] = useState(false);
  const wrapperRef = useRef(null);

  const handleFinishTakingANote = () => {
    if (note.text === "" && note.title === "") setIsTakingANote(false);
    else {
      onCreateNote(note);
      setNote(initialNote);
      setIsTakingANote(false);
    }
  };

  const handleClickOutside = (e) => {
    if (!isTakingANote) return;
    if (wrapperRef && !wrapperRef.current.contains(e.target)) {
      handleFinishTakingANote();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div
      className={isTakingANote ? styles.wrapperActive : styles.wrapper}
      ref={wrapperRef}
      onClick={() => {
        if (isTakingANote) return;
        setIsTakingANote(true);
      }}
    >
      {isTakingANote ? (
        <div className={styles.active}>
          <div className={styles.activeInputs}>
            {/* TODO: Make custom textboxes (contenteditable) */}
            <input
              placeholder="Title"
              type="text"
              value={note.title}
              onChange={(e) => {
                setNote({ ...note, title: e.target.value });
              }}
            />
            <textarea
              placeholder="Take a note..."
              value={note.text}
              autoFocus
              onChange={(e) => {
                setNote({ ...note, text: e.target.value });
              }}
            />
          </div>
          <div className={styles.activeFooter}>
            <div>OPTIONS {"(todo)"}</div>
            <div
              onClick={handleFinishTakingANote}
              className={styles.activeCloseBtn}
            >
              Close
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.notActive}>
          <div>Take a note...</div>
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
