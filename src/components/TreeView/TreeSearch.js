import React, { useState, useEffect } from "react";
import useDebounce from "./../../hooks/useDebounce";

export default function TreeSearch({ onShowResult }) {
  const [search, setSearch] = useState("");
  const [isResultShown, setIsResultShown] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch) {
      onShowResult(true, search);
    }
  }, [debouncedSearch, onShowResult]);

  const updateSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value.length >= 3) {
      setIsResultShown(true);
      onShowResult(true, e.target.value);
    } else {
      setIsResultShown(false);
      onShowResult(false, e.target.value);
    }
  };
  return (
    <div>
      <input onChange={updateSearch} value={search} />
    </div>
  );
}
