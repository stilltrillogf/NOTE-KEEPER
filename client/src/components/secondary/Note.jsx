import React, { useState } from "react";

import styles from "../../styles/Note.module.css";
import { NoteEditModal } from "./NoteEditModal";

export const Note = ({ note }) => {
  const [isEditing, setIsEditing] = useState(false);
  // TODO: add overlay on hover
  return (
    <>
      <div
        onClick={() => {
          setIsEditing(true);
        }}
        className={styles.note}
        key={note._id}
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
