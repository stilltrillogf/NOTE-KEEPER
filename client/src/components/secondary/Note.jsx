import React, { useEffect, useRef, useState } from "react";
import { BsPin } from "react-icons/bs";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

import styles from "../../styles/Note.module.css";
import { NoteEditModal } from "./NoteEditModal";

export const Note = ({ note }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [noteIsHovered, setNoteIsHovered] = useState(true);
  const noteRef = useRef(null);

  const handleClickNote = () => {
    // TODO: If part of the overlay is clicked - return
    setIsEditing(true);
  };

  const handleHoverNote = (e) => {
    if (noteRef && noteRef.current.contains(e.target)) {
      console.log("hovering the note");

      // TODO: Make it so it doesn't re-fire when hovered over item that is INSIDE the note
      // Intended behavior :
      // -> once the cursor has entered the note, noteIsHovered state changes to true (overlay becomes visible)
      // -> once the cursor has left the note, noteIsHovered state changes to false (overlay disappears)
    }
  };

  useEffect(() => {
    window.addEventListener("mouseover", handleHoverNote);

    return () => {
      window.removeEventListener("mouseover", handleHoverNote);
    };
  }, [handleHoverNote]);

  return (
    <>
      <div
        onClick={handleClickNote}
        className={styles.note}
        key={note._id}
        ref={noteRef}
      >
        <div className={styles.noteTitle}>{note.title}</div>
        <div className={styles.noteText}>{note.text}</div>
        {noteIsHovered && <NoteOverlay />}
        <div
          className={`${styles.overlayFooter} ${
            noteIsHovered ? "" : styles.hidden
          }`}
        >
          FOOTER
        </div>
      </div>
      {isEditing && (
        <NoteEditModal isEditingState={[isEditing, setIsEditing]} note={note} />
      )}
    </>
  );
};

const NoteOverlay = () => {
  return (
    <>
      <IoCheckmarkCircleOutline className={styles.overlaySelect} size={25} />
      <BsPin className={styles.overlayPin} size={25} />
    </>
  );
};
