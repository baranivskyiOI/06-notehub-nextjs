import { fetchNotes, NotesListResponse } from "@/lib/api";
import Notes from "./Notes.client";

const NotePages = async () => {
  const page = 1;
  const query = "";

  const notesData: NotesListResponse = await fetchNotes(query, page);

  return <Notes page={page} query={query} notesData={notesData} />;
};

export default NotePages;
