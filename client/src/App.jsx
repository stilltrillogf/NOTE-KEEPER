import { useQuery } from "@tanstack/react-query";
import { PacmanLoader } from "react-spinners";
import "./App.css";
import { CreateNote } from "./Components/CreateNote";
import { Notes } from "./Components/Notes";
import { readNotesRequest } from "./API/readNotesRequest";

function App() {
  const {
    isLoading,
    isError,
    data: notes,
    error,
  } = useQuery(["notes"], readNotesRequest);

  if (isError) {
    return (
      <div style={{ color: "red" }}>Following error occurred: {error}</div>
    );
  }

  return (
    <>
      <CreateNote />
      {isLoading ? <PacmanLoader /> : <Notes notes={notes} />}
    </>
  );
}

export default App;
