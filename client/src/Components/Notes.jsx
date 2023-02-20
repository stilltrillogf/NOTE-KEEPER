import React from "react";
import { Note } from "./Note";

export const Notes = ({ notes }) => {
  return (
    <>
      {notes.map((note) => {
        return <Note key={note._id} note={note} />;
      })}
    </>
  );
};
