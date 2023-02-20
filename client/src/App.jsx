import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import "./App.css";
import { CreateNote } from "./Components/CreateNote";
import { Notes } from "./Components/Notes";
import { readNotesRequest } from "./API/readNotesRequest";
import { useState } from "react";
import { createNoteRequest } from "./API/createNoteRequest";

function App() {
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
    <>
      <CreateNote createNote={createNote} />
      {isLoading ? <ClipLoader /> : <Notes notes={notes} />}
    </>
  );
}

export default App;
