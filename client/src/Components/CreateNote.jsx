import React, { useState } from "react";

const initialNote = {
  title: "",
  text: "",
};

export const CreateNote = ({ createNote }) => {
  const [note, setNote] = useState(initialNote);

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <div
        style={{
          border: "1px solid black",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <input
          placeholder="Title"
          type="text"
          value={note.title}
          onChange={(e) => {
            setNote({ ...note, title: e.target.value });
          }}
        />
        <textarea
          placeholder="Text"
          style={{ resize: "none" }}
          value={note.text}
          onChange={(e) => {
            setNote({ ...note, text: e.target.value });
          }}
        />
      </div>
      <button
        onClick={() => {
          console.log(note);
          createNote(note);
          setNote(initialNote);
        }}
      >
        +
      </button>
    </div>
  );
};
