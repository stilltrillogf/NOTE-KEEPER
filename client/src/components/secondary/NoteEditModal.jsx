import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { BsTrash } from "react-icons/bs";

import { deleteNoteRequest } from "../../API/deleteNoteRequest";
import { updateNoteRequest } from "../../API/updateNoteRequest";
import styles from "../../styles/NoteEditModal.module.css";

export const NoteEditModal = ({ note, isEditingState }) => {
  const [isEditing, setIsEditing] = isEditingState;
  const [updatedNote, setUpdatedNote] = useState(note);
  const modalRef = useRef(null);
  const textInputRef = useRef(null);

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
    deleteNote(note);
  };

  const handleFinishEditing = () => {
    if (updatedNote !== note) {
      updateNote(updatedNote);
      setUpdatedNote(note);
      setIsEditing(false);
    } else {
      setIsEditing(false);
    }
  };

  const handleClickOutside = (e) => {
    if (modalRef && !modalRef.current.contains(e.target)) {
      handleFinishEditing();
    }
  };

  useEffect(() => {
    focusTheEndOfText(textInputRef.current);
  }, []);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <>
      <div className={styles.modalOverlay}></div>
      <div ref={modalRef} className={styles.modal}>
        <div
          className={styles.customTitleTextbox}
          suppressContentEditableWarning="true"
          contentEditable={true}
          onInput={(e) => {
            setUpdatedNote({ ...updatedNote, title: e.target.textContent });
          }}
        >
          {note.title}
        </div>
        <div
          className={styles.customTextTextbox}
          suppressContentEditableWarning="true"
          contentEditable={true}
          ref={textInputRef}
          onInput={(e) => {
            setUpdatedNote({ ...updatedNote, text: e.target.textContent });
          }}
        >
          {note.text}
        </div>
        <div className={styles.footer}>
          <div className={styles.options}>
            <BsTrash className={styles.option} onClick={handleDeleteNote} />
          </div>
          <div onClick={handleFinishEditing} className={styles.closeBtn}>
            Close
          </div>
        </div>
      </div>
    </>
  );
};

const focusTheEndOfText = (el) => {
  el.focus();
  window.getSelection().selectAllChildren(el);
  window.getSelection().collapseToEnd();
};
