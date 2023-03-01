import React from "react";
import { Note } from "./Note";
import styles from "../../styles/Notes.module.css";

export const Notes = ({ notes }) => {
  return (
    <div className={styles.notesGrid}>
      {notes.map((note) => {
        return <Note key={note._id} note={note} />;
      })}
    </div>
  );
};
