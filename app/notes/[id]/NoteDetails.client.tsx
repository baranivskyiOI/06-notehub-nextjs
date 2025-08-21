"use client";

import { fetchNoteByID } from "@/lib/api";
import css from "./NoteDetails.module.css";
import { useQuery } from "@tanstack/react-query";

type NoteDetailsProp = {
  id: string;
};

const NoteDetails = ({ id }: NoteDetailsProp) => {
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notes", id],
    queryFn: () => fetchNoteByID(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (isError || !note) {
    return <p>Something went wrong.</p>;
  }

  return (
    <>
      {note && !isLoading && (
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>{note.createdAt}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default NoteDetails;
