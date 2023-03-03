import React, { forwardRef, useEffect, useRef, useState } from "react";
import { BsPin } from "react-icons/bs";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { BsTrash, BsThreeDotsVertical } from "react-icons/bs";

import styles from "../../styles/secondary/Note.module.css";
import { NoteEditModal } from "./NoteEditModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNoteRequest } from "../../API/deleteNoteRequest";
import { ConfirmationPopup } from "../utility/ConfirmationPopup";

export const Note = ({ note, popupStorage, setPopupStorage }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [overlayIsVisible, setOverlayIsVisible] = useState(false);

  const noteRef = useRef(null);
  const overlayRef = useRef(null);

  const handleClickNote = (e) => {
    if (overlayRef && overlayRef.current.contains(e.target)) {
      return;
    }
    setIsEditing(true);
  };

  const handleHoverNote = (e) => {
    if (noteRef && noteRef.current.contains(e.target)) {
      setOverlayIsVisible(true);
    } else {
      setOverlayIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("mouseover", handleHoverNote);

    return () => {
      window.removeEventListener("mouseover", handleHoverNote);
    };
  }, [handleHoverNote]);

  useEffect(() => {
    isEditing && (document.body.style.overflow = "hidden");
    !isEditing && (document.body.style.overflow = "");
  }, [isEditing]);

  return (
    <>
      <div
        onClick={handleClickNote}
        className={styles.note}
        key={note._id}
        ref={noteRef}
      >
        <div className={styles.noteTitle}>
          {note.title.length > 150
            ? note.title.slice(0, 150) + "..."
            : note.title}
        </div>
        <div className={styles.noteText}>
          {note.text.length > 300 ? note.text.slice(0, 300) + "..." : note.text}
        </div>
        <NoteOverlay
          popupStorage={popupStorage}
          setPopupStorage={setPopupStorage}
          note={note}
          overlayIsVisible={overlayIsVisible}
          ref={overlayRef}
        />
      </div>
      {isEditing && (
        <NoteEditModal
          popupStorage={popupStorage}
          setPopupStorage={setPopupStorage}
          isEditingState={[isEditing, setIsEditing]}
          note={note}
        />
      )}
    </>
  );
};

const NoteOverlay = forwardRef(
  ({ note, overlayIsVisible, popupStorage, setPopupStorage }, ref) => {
    const [popupIsVisible, setPopupIsVisible] = useState(false);

    const queryClient = useQueryClient();

    const { mutate: deleteNote } = useMutation(
      (note) => {
        return deleteNoteRequest(note);
      },
      {
        onSettled: (_, err) => {
          err && console.log(err);
          queryClient.invalidateQueries("notes");
        },
      }
    );

    const handleDeleteNote = () => {
      popupStorage === null && setPopupIsVisible(true);
      popupStorage === true && deleteNote(note);
    };

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
              <BsTrash
                onClick={handleDeleteNote}
                className={styles.optionsFooterOption}
              />
            </div>
            <BsThreeDotsVertical className={styles.optionsFooterOption} />
          </div>
          {popupIsVisible && (
            <ConfirmationPopup
              setPopupStorage={setPopupStorage}
              note={note}
              setPopupIsVisible={setPopupIsVisible}
            />
          )}
        </div>
      </>
    );
  }
);
