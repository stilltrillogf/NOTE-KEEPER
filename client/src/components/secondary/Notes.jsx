import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import { Note } from "./Note";
import styles from "../../styles/secondary/Notes.module.css";

export const Notes = ({ notes }) => {
  const [popupStorage, setPopupStorage] = useState(null);

  useEffect(() => {
    setPopupStorage(JSON.parse(window.sessionStorage.getItem("displayPopup")));
  }, []);

  return (
    <Masonry
      breakpointCols={3}
      className={styles.masonryNotesGrid}
      columnClassName={styles.masonryNotesGridColumn}
    >
      {notes.map((note) => {
        return (
          <Note
            popupStorage={popupStorage}
            setPopupStorage={setPopupStorage}
            key={note._id}
            note={note}
          />
        );
      })}
    </Masonry>
  );
};
