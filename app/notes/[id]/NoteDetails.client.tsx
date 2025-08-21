"use client";

import { fetchNoteByID } from "@/lib/api";
import { Note } from "@/types/note";
import css from "./NoteDetails.module.css";

type NoteDetailsProp = {
  id: string;
};

const NoteDetails = ({ id }: NoteDetailsProp) => {
  const note: Note = async () => await fetchNoteByID(id);

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{note.createdAt}</p>
      </div>
    </div>
  );
};

export default NoteDetails;
