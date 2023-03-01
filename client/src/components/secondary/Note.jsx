import React, { forwardRef, useEffect, useRef, useState } from "react";
import { BsPin } from "react-icons/bs";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { BsTrash, BsThreeDotsVertical } from "react-icons/bs";

import styles from "../../styles/Note.module.css";
import { NoteEditModal } from "./NoteEditModal";

export const Note = ({ note }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [overlayIsVisible, setoverlayIsVisible] = useState(false);
  const noteRef = useRef(null);
  const overlayRef = useRef(null);

  const handleClickNote = (e) => {
    if (overlayRef && overlayRef.current.contains(e.target)) {
      console.log("overlay");
      return;
    }
    setIsEditing(true);
  };

  const handleHoverNote = (e) => {
    if (noteRef && noteRef.current.contains(e.target)) {
      setoverlayIsVisible(true);
    } else {
      setoverlayIsVisible(false);
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
        <NoteOverlay overlayIsVisible={overlayIsVisible} ref={overlayRef} />
      </div>
      {isEditing && (
        <NoteEditModal isEditingState={[isEditing, setIsEditing]} note={note} />
      )}
    </>
  );
};

const NoteOverlay = forwardRef(({ overlayIsVisible }, ref) => {
  return (
    <>
      <div ref={ref}>
        <IoCheckmarkCircleOutline
          className={`${styles.overlaySelect} ${
            overlayIsVisible ? "" : styles.hidden
          }`}
          size={25}
        />
        <BsPin
          className={`${styles.overlayPin} ${
            overlayIsVisible ? "" : styles.hidden
          }`}
          size={25}
        />
        <div
          className={`${styles.optionsFooter} ${
            overlayIsVisible ? "" : styles.hidden
          }`}
          ref={ref}
        >
          <div className={styles.optionsFooterOptions}>
            <BsTrash className={styles.optionsFooterOption} />
          </div>
          <BsThreeDotsVertical className={styles.optionsFooterOption} />
        </div>
      </div>
    </>
  );
});
