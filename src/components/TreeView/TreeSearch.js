import React, { useState, useEffect } from "react";
import useDebounce from "./../../hooks/useDebounce";

export default function TreeSearch({ onShowResult, initialSearch }) {
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    onShowResult(search);
  }, [debouncedSearch]);

  useEffect(() => {
    if (initialSearch) {
      setSearch(initialSearch);
    }
  }, [initialSearch]);

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className="item__wrapper item-level-0">
      <input placeholder="Поиск" onChange={updateSearch} value={search} />
    </div>
  );
}
