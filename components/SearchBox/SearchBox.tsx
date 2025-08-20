"use client";
import css from "./SearchBox.module.css";
import type { DebouncedState } from "use-debounce";

interface SearchBoxProps {
  value: string;
  onSearch: DebouncedState<(newSearchQuery: string) => void>;
}

export default function SearchBox({ value, onSearch }: SearchBoxProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <input
      onChange={handleChange}
      defaultValue={value}
      className={css.input}
      type="text"
      placeholder="Search notes"
    />
  );
}
