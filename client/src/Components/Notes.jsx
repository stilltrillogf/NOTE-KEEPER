import React from "react";

export const Notes = ({ notes }) => {
  return (
    <>
      {notes.map((note) => {
        return (
          <div key={note._id}>
            <div>{note.title}</div>
            <div>{note.text}</div>
          </div>
        );
      })}
    </>
  );
};
