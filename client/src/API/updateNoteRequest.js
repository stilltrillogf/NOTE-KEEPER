import { API_URL } from "./config";

export const updateNoteRequest = (note) => {
  return fetch(`${API_URL}/notes/${note._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: note.title,
      text: note.text,
      position: note.position,
    }),
  }).then((res) => res.json());
};
