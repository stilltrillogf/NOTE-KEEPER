import React from "react";
import { ClipLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";

import styles from "../../styles/NotesPanel.module.css";
import { CreateNote } from "../secondary/CreateNote";
import { Notes } from "../secondary/Notes";
import { readNotesRequest } from "../../API/readNotesRequest";

export const NotesPanel = () => {
  const {
    isLoading,
    isError,
    data: notes,
    error,
  } = useQuery(["notes"], readNotesRequest);

  if (isError) {
    return (
      <div style={{ color: "red" }}>Following error occurred: {error}</div>
    );
  }
  return (
    <div className={styles.notesPanel}>
      <CreateNote />
      {isLoading ? <ClipLoader /> : <Notes notes={notes} />}
    </div>
  );
};
