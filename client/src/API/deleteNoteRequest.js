import { API_URL } from "./config";

export const deleteNoteRequest = (note) => {
  return fetch(`${API_URL}/notes/${note._id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};
