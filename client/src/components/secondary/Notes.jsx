import React, { useEffect, useRef, useState } from "react";
import Masonry from "react-masonry-css";
import { Note } from "./Note";
import styles from "../../styles/secondary/Notes.module.css";

export const Notes = ({ notes }) => {
  const [popupStorage, setPopupStorage] = useState(null);

  const [columnsNumber, setColumnsNumber] = useState(
    Math.floor(window.innerWidth / 250)
  );
  const [columns, setColumns] = useState(
    Array.from({ length: columnsNumber }, (_, index) => {
      return (
        <Masonry
          key={index}
          breakpointCols={1}
          className={styles.masonryNotesGrid}
          columnClassName={styles.masonryNotesGridColumn}
        ></Masonry>
      );
    })
  );
  const [columnsState, setColumnsState] = useState({
    col1: [],
    col2: [],
    col3: [],
  });

  const handleGridWidthChange = () => {
    setColumnsNumber(Math.floor(window.innerWidth / 250));
    setColumns(
      Array.from({ length: columnsNumber }, (_, index) => {
        return (
          <Masonry
            key={index}
            breakpointCols={1}
            className={styles.masonryNotesGrid}
            columnClassName={styles.masonryNotesGridColumn}
          ></Masonry>
        );
      })
    );
  };

  useEffect(() => {
    setPopupStorage(JSON.parse(window.sessionStorage.getItem("displayPopup")));
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleGridWidthChange);

    return () => {
      window.removeEventListener("resize", handleGridWidthChange);
    };
  }, [handleGridWidthChange]);

  return (
    <div className={styles.notesGrid}>
      {/* Make it fit as many columns as it can with current width
      -> calculate number of columns based on current width
      -> render this amount of columns
      -> make the state for this amount of columns
      -> split notes between this amount of columns

       */}
      {columns.map((_, index) => {
        return (
          <Masonry
            key={index}
            breakpointCols={1}
            className={styles.masonryNotesGrid}
            columnClassName={styles.masonryNotesGridColumn}
          >
            <Note note={notes[1]} />
          </Masonry>
        );
      })}
    </div>
  );
};
