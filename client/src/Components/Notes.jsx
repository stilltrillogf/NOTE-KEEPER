import React from "react";

export const Notes = ({ notes }) => {
  return (
    <>
      {notes.map((note) => {
        return (
          <div style={{ border: "1px solid black" }} key={note._id}>
            <div>Title: {note.title}</div>
            <div>Text: {note.text}</div>
          </div>
        );
      })}
    </>
  );
};
