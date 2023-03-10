import React from "react";
import { ClipLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";

import styles from "../../styles/main/NotesPanel.module.css";
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

  return (
    <div className={styles.notesPanel}>
      <CreateNote notes={notes} />
      {isLoading ? <ClipLoader /> : <Notes notes={notes} />}
    </div>
  );
};
