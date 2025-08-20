"use client";
import css from "./NotesPage.module.css";
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes, NotesListResponse } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import SearchBox from "@/components/SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";
import NoteForm from "@/components/NoteForm/NoteForm";

type NotesProps = {
  page: number;
  query: string;
  notesData: NotesListResponse;
};

function Notes({ page, query, notesData }: NotesProps) {
  const [currentPage, setCurrentPage] = useState(page);
  const [searchQuery, setSearchQuery] = useState(query);

  const updateSearchQuery = useDebouncedCallback((newSearchQuery: string) => {
    setSearchQuery(newSearchQuery);
    setCurrentPage(1);
  }, 300);

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["notes", currentPage, searchQuery],
    queryFn: () => fetchNotes(searchQuery, currentPage),
    placeholderData: keepPreviousData,
  });

  const [isModalOpen, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const nbPages: number = data?.totalPages ?? 0;

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox value={searchQuery} onSearch={updateSearchQuery} />
          {isSuccess && nbPages > 1 && (
            <Pagination
              page={currentPage}
              total={nbPages}
              onChange={setCurrentPage}
            />
          )}
          <button className={css.button} onClick={openModal}>
            Create Note +
          </button>
          {isModalOpen && (
            <Modal onClose={closeModal}>
              <NoteForm onClose={closeModal} />
            </Modal>
          )}
        </header>
        {data && !isLoading && <NoteList notes={data.notes} />}
      </div>
    </>
  );
}

export default Notes;
