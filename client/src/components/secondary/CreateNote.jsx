import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import styles from "../../styles/secondary/CreateNote.module.css";
import { createNoteRequest } from "../../API/createNoteRequest";

export const CreateNote = ({ notes }) => {
  const [note, setNote] = useState(initialNote);
  const [isTakingANote, setIsTakingANote] = useState(false);
  const [timeoutIsActive, setTimeoutIsActive] = useState(false);
  const wrapperRef = useRef(null);

  const queryClient = useQueryClient();

  const { mutate: createNote } = useMutation(
    (note) => {
      return createNoteRequest(note);
    },
    {
      onSettled: (_, err) => {
        err && console.log(err);
        queryClient.invalidateQueries("notes");
      },
    }
  );

  const handleTakeANote = () => {
    if (isTakingANote) return;
    if (timeoutIsActive) return; // TODO: popup with info that user must wait
    setIsTakingANote(true);
  };

  const handleFinishTakingANote = () => {
    if (note.text === "" && note.title === "") setIsTakingANote(false);
    else {
      createNote(note);
      setNote(initialNote);
      setIsTakingANote(false);
      setTimeoutIsActive(true);
      setTimeout(() => {
        setTimeoutIsActive(false);
      }, 2500);
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
      onClick={handleTakeANote}
    >
      {isTakingANote ? (
        <CreateNoteActive
          notes={notes}
          note={note}
          setNote={setNote}
          handleFinishTakingANote={handleFinishTakingANote}
        />
      ) : (
        <div className={styles.notActive}>
          <div>Take a note...</div>
          <div>SHORTCUTS {"(templates etc)"}</div>
        </div>
      )}
    </div>
  );
};

const CreateNoteActive = ({
  notes,
  note,
  setNote,
  handleFinishTakingANote,
}) => {
  const textInputRef = useRef(null);

  useEffect(() => {
    textInputRef.current.focus();
  }, []);

  useEffect(() => {
    setNote({ ...note, position: notes.length + 1 });
  }, []);

  return (
    <div className={styles.active}>
      <div className={styles.activeInputs}>
        <div
          className={styles.customTitleTextbox}
          contentEditable={true}
          onInput={(e) => {
            setNote({ ...note, title: e.target.textContent });
          }}
        ></div>
        <div
          className={styles.customTextTextbox}
          contentEditable={true}
          autoFocus
          onInput={(e) => {
            setNote({ ...note, text: e.target.textContent });
          }}
          ref={textInputRef}
        ></div>
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
  );
};

const initialNote = {
  title: "",
  text: "",
};
