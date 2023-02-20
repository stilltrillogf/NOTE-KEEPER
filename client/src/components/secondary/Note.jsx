import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { deleteNoteRequest } from "../../API/deleteNoteRequest";
import { updateNoteRequest } from "../../API/updateNoteRequest";
import styles from "../../styles/Note.module.css";

export const Note = ({ note }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedNote, setUpdatedNote] = useState(note);
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

  const { mutate: updateNote } = useMutation(
    (note) => {
      return updateNoteRequest(note);
    },
    {
      onSettled: (_, err) => {
        err && console.log(err);
        queryClient.invalidateQueries("notes");
      },
    }
  );

  const handleDeleteNote = () => {
    deleteNote(note);
  };

  const handleEditNote = () => {
    if (isEditing) {
      updateNote(updatedNote);
      setUpdatedNote(note);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  return (
    <div
      style={{
        border: "1px solid black",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
      key={note._id}
    >
      {/* TODO: Here modal component with note will be opened, positioned in the center of the screen
    It will edit the note live */}
      {isEditing ? (
        <>
          <input
            type="text"
            value={updatedNote.title}
            onChange={(e) => {
              setUpdatedNote({ ...note, title: e.target.value });
            }}
          />
          <textarea
            value={updatedNote.text}
            onChange={(e) => {
              setUpdatedNote({ ...note, text: e.target.value });
            }}
          />
        </>
      ) : (
        <>
          <div>Title: {note.title}</div>
          <div>Text: {note.text}</div>
        </>
      )}
      <div
        onClick={handleEditNote}
        style={{
          position: "absolute",
          right: "0",
          bottom: "0",
          cursor: "pointer",
        }}
      >
        {isEditing ? "SAVE" : "EDIT"}
      </div>
      {isEditing ? null : (
        <div
          onClick={handleDeleteNote}
          style={{
            position: "absolute",
            right: "0",
            top: "0",
            cursor: "pointer",
          }}
        >
          DELETE
        </div>
      )}
    </div>
  );
};
