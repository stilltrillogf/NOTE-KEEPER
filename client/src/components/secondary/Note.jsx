import React, { useEffect, useRef, useState } from "react";
import { BsPin } from "react-icons/bs";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { BsTrash, BsThreeDotsVertical } from "react-icons/bs";

import styles from "../../styles/Note.module.css";
import { NoteEditModal } from "./NoteEditModal";

export const Note = ({ note }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [noteIsHovered, setNoteIsHovered] = useState(false);
  const noteRef = useRef(null);

  const handleClickNote = () => {
    // TODO: If part of the overlay is clicked - return
    setIsEditing(true);
  };

  const handleHoverNote = (e) => {
    if (noteRef && noteRef.current.contains(e.target)) {
      setNoteIsHovered(true);
    } else {
      setNoteIsHovered(false);
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
          className={`${styles.optionsFooter} ${
            noteIsHovered ? "" : styles.hidden
          }`}
        >
          <div className={styles.optionsFooterOptions}>
            <BsTrash className={styles.optionsFooterOption} />
          </div>
          <BsThreeDotsVertical className={styles.optionsFooterOption} />
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
