import React from "react";
import Masonry from "react-masonry-css";
import { Note } from "./Note";
import styles from "../../styles/secondary/Notes.module.css";

export const Notes = ({ notes }) => {
  return (
    <Masonry
      breakpointCols={3}
      className={styles.masonryNotesGrid}
      columnClassName={styles.masonryNotesGridColumn}
    >
      {notes.map((note) => {
        return <Note key={note._id} note={note} />;
      })}
    </Masonry>
  );
};
