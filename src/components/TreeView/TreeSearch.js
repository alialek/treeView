import React, { useState, useEffect } from "react";
import useDebounce from "./../../hooks/useDebounce";

export default function TreeSearch({ onShowResult }) {
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    onShowResult(search);
  }, [debouncedSearch]);

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div>
      <input onChange={updateSearch} value={search} />
    </div>
  );
}
