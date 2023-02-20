import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";

import styles from "../../styles/NotesPanel.module.css";
import { CreateNote } from "../secondary/CreateNote";
import { Notes } from "../secondary/Notes";
import { readNotesRequest } from "../../API/readNotesRequest";
import { createNoteRequest } from "../../API/createNoteRequest";

export const NotesPanel = () => {
  const {
    isLoading,
    isError,
    data: notes,
    error,
  } = useQuery(["notes"], readNotesRequest);

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

  if (isError) {
    return (
      <div style={{ color: "red" }}>Following error occurred: {error}</div>
    );
  }
  return (
    <div className={styles.notesPanel}>
      <CreateNote onCreateNote={createNote} />
      {isLoading ? <ClipLoader /> : <Notes notes={notes} />}
    </div>
  );
};
