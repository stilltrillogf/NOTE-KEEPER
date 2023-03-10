import React, { forwardRef, useEffect, useRef, useState } from "react";
import { BsPin } from "react-icons/bs";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { BsTrash, BsThreeDotsVertical } from "react-icons/bs";

import styles from "../../styles/secondary/Note.module.css";
import { NoteEditModal } from "./NoteEditModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNoteRequest } from "../../API/deleteNoteRequest";
import { ConfirmationPopup } from "../utility/ConfirmationPopup";
import { updateNoteRequest } from "../../API/updateNoteRequest";

export const Note = ({
  draggedNote,
  setDraggedNote,
  note,
  popupStorage,
  setPopupStorage,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [overlayIsVisible, setOverlayIsVisible] = useState(false);
  const [thisNoteIsDragged, setThisNoteIsDragged] = useState(false);
  const [dynamicDropZoneClass, setDynamicDropZoneClass] = useState(
    calculateDynamicDropZoneClass(draggedNote, note, thisNoteIsDragged)
  );
  const noteRef = useRef(null);
  const overlayRef = useRef(null);

  const queryClient = useQueryClient();

  const { mutate: updateNote } = useMutation(
    (note) => {
      return updateNoteRequest(note);
    },
    {
      onSettled: (_, err) => {
        err && console.log(err);
        queryClient.invalidateQueries("notes");
      },
    }
  );

  const handleClickNote = (e) => {
    if (overlayRef.current && overlayRef.current.contains(e.target)) {
      return;
    }
    setIsEditing(true);
  };

  const handleHoverNote = (e) => {
    if (noteRef.current && noteRef.current.contains(e.target)) {
      setOverlayIsVisible(true);
    } else {
      setOverlayIsVisible(false);
    }
  };

  const handleDragStart = (e) => {
    e.nativeEvent.dataTransfer.setData("text/plain", JSON.stringify(note));
    setDraggedNote(note);
    setThisNoteIsDragged(true);
    setDynamicDropZoneClass(
      calculateDynamicDropZoneClass(draggedNote, note, thisNoteIsDragged)
    );
    setOverlayIsVisible(false);
    e.nativeEvent.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = (e) => {
    setDraggedNote(null);
    setThisNoteIsDragged(false);
  };

  const handleDragEnter = (e) => {
    if (draggedNote.isPinned === true && note.isPinned === true) {
      e.preventDefault();
    }
    if (draggedNote.isPinned === false && note.isPinned === false) {
      e.preventDefault();
    }
  };

  const handleDragOver = (e) => {
    if (draggedNote.isPinned === true && note.isPinned === true) {
      e.preventDefault();
    }
    if (draggedNote.isPinned === false && note.isPinned === false) {
      e.preventDefault();
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const draggedNote = JSON.parse(
      e.nativeEvent.dataTransfer.getData("text/plain")
    );
    updateNote({ ...draggedNote, position: note.position });
    updateNote({ ...note, position: draggedNote.position });
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

  useEffect(() => {
    setDynamicDropZoneClass(
      calculateDynamicDropZoneClass(draggedNote, note, thisNoteIsDragged)
    );
  }, [draggedNote, note, thisNoteIsDragged]);

  return (
    <>
      <div
        onClick={handleClickNote}
        className={`${styles.note} ${dynamicDropZoneClass}`}
        key={note._id}
        ref={noteRef}
        draggable="true"
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
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

const calculateDynamicDropZoneClass = (
  draggedNote,
  note,
  thisNoteIsDragged
) => {
  if (
    thisNoteIsDragged === false &&
    draggedNote?.isPinned === true &&
    note.isPinned === true
  ) {
    return styles.noteDropZone;
  }
  if (
    thisNoteIsDragged === false &&
    draggedNote?.isPinned === false &&
    note.isPinned === false
  ) {
    return styles.noteDropZone;
  }
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

    const { mutate: updateNote } = useMutation(
      (note) => {
        return updateNoteRequest(note);
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

    const handlePinUnpinNote = () => {
      updateNote({ ...note, isPinned: !note.isPinned });
      console.log(note);
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
            onClick={handlePinUnpinNote}
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
