import React, { useEffect, useRef, useState } from "react";
import { BsPin } from "react-icons/bs";

import styles from "../../styles/Note.module.css";
import { NoteEditModal } from "./NoteEditModal";

export const Note = ({ note }) => {
  const [isEditing, setIsEditing] = useState(false);
  const noteRef = useRef(null);

  const handleHoverNote = (e) => {
    if (noteRef && noteRef.current.contains(e.target)) {
      // console.log("hovering the note");
    }
  };
  // on hover change state of overlay
  useEffect(() => {
    window.addEventListener("mouseover", handleHoverNote);

    return () => {
      window.removeEventListener("mouseover", handleHoverNote);
    };
  }, [handleHoverNote]);

  return (
    <>
      <div
        onClick={() => {
          setIsEditing(true);
        }}
        className={styles.note}
        key={note._id}
        ref={noteRef}
      >
        <div className={styles.noteTitle}>{note.title}</div>

        <div className={styles.noteText}>{note.text}</div>
      </div>
      {isEditing && (
        <NoteEditModal isEditingState={[isEditing, setIsEditing]} note={note} />
      )}
    </>
  );
};
