import { API_URL } from "./config";

export const createNoteRequest = (note) => {
  return fetch(`${API_URL}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      title: note.title,
      text: note.text,
    },
  }).then((res) => res.json());
};
