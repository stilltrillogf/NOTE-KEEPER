import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import { Note } from "./Note";
import styles from "../../styles/secondary/Notes.module.css";

export const Notes = ({ notes }) => {
  const [sortedNotes, setSortedNotes] = useState(
    notes.sort((a, b) => {
      return a.position - b.position;
    })
  );
  const [popupStorage, setPopupStorage] = useState(null);
  const [columnsNumber, setColumnsNumber] = useState(
    Math.floor(window.innerWidth / 250)
  );
  const [columns, setColumns] = useState(
    splitNotesBetweenColumns(sortedNotes, columnsNumber)
  );
  const [noteIsDragged, setNoteIsDragged] = useState(false);

  const handleGridWidthChange = () => {
    setColumnsNumber(Math.floor(window.innerWidth / 250));
    setColumns(splitNotesBetweenColumns(sortedNotes, columnsNumber));
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
    setColumns(splitNotesBetweenColumns(sortedNotes, columnsNumber));
  }, [sortedNotes, columnsNumber]);

  useEffect(() => {
    setSortedNotes(
      notes.sort((a, b) => {
        return a.position - b.position;
      })
    );
  }, [notes]);

  return (
    <div className={styles.notesGrid}>
      {columns.map((columnNotes, index) => {
        return (
          <Masonry
            key={index}
            breakpointCols={1}
            className={styles.masonryNotesGrid}
            columnClassName={styles.masonryNotesGridColumn}
          >
            {columnNotes.map((note) => {
              if (!note) return;
              return (
                <Note
                  noteIsDragged={noteIsDragged}
                  setNoteIsDragged={setNoteIsDragged}
                  key={note._id}
                  popupStorage={popupStorage}
                  setPopupStorage={setPopupStorage}
                  note={note}
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
  const columns = Array.from({ length: columnsNumber }, () => []);
  let currentIndex = 0;

  notes.forEach((note) => {
    columns[currentIndex].push(note);
    currentIndex = (currentIndex + 1) % columnsNumber;
  });

  return columns;
}
