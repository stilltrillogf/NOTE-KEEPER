import { API_URL } from "./config";

export const createNoteRequest = (note) => {
  console.log(note);
  return fetch(`${API_URL}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: note.title,
      text: note.text,
      position: note.position,
      isPinned: note.isPinned,
    }),
  }).then((res) => res.json());
};
