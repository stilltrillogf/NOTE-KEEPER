import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import { Note } from "./Note";
import styles from "../../styles/secondary/Notes.module.css";

export const Notes = ({ notes }) => {
  const [popupStorage, setPopupStorage] = useState(null);

  const [columnsNumber, setColumnsNumber] = useState(
    Math.floor(window.innerWidth / 250)
  );
  const [columns, setColumns] = useState(
    splitNotesBetweenColumns(notes, columnsNumber)
  );

  const handleGridWidthChange = () => {
    setColumnsNumber(Math.floor(window.innerWidth / 250));
    setColumns(splitNotesBetweenColumns(notes, columnsNumber));
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

  useEffect(() => {
    setColumns(splitNotesBetweenColumns(notes, columnsNumber));
  }, [notes, columnsNumber]);

  /*
when the note is deleted, columns doesn't update indexes so one note becomes undefined 
*/

  console.log(columns);
  return (
    <div className={styles.notesGrid}>
      {columns.map((colNotes, index) => {
        return (
          <Masonry
            key={index}
            breakpointCols={1}
            className={styles.masonryNotesGrid}
            columnClassName={styles.masonryNotesGridColumn}
          >
            {colNotes.map((notesIndex, index) => {
              if (!notes[notesIndex]) return;

              return (
                <Note
                  key={index}
                  popupStorage={popupStorage}
                  setPopupStorage={setPopupStorage}
                  note={notes[notesIndex]}
                />
              );
            })}
          </Masonry>
        );
      })}
    </div>
  );
};

function splitNotesBetweenColumns(notes, columnsNumber) {
  const containers = Array.from({ length: columnsNumber }, () => []);
  let currentIndex = 0;

  notes.forEach((_, i) => {
    containers[currentIndex].push(i);
    currentIndex = (currentIndex + 1) % columnsNumber;
  });

  return containers;
}
