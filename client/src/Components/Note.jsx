import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { deleteNoteRequest } from "../API/deleteNoteRequest";

export const Note = ({ note }) => {
  const queryClient = useQueryClient();

  const { mutate: deleteNote } = useMutation(
    (note) => {
      return deleteNoteRequest(note);
    },
    {
      onSettled: (_, err) => {
        err && console.log(err);
        queryClient.invalidateQueries("notes");
      },
    }
  );

  return (
    <div
      style={{ border: "1px solid black", position: "relative" }}
      key={note._id}
    >
      <div>Title: {note.title}</div>
      <div>Text: {note.text}</div>
      <div
        onClick={() => {
          deleteNote(note);
        }}
        style={{
          position: "absolute",
          right: "0",
          top: "0",
          cursor: "pointer",
        }}
      >
        DELETE
      </div>
    </div>
  );
};
