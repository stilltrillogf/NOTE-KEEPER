import { API_URL } from "./config";

export const readNotesRequest = () => {
  return fetch(`${API_URL}/notes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};
