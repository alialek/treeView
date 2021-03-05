import React, { useState, useEffect } from "react";
import useDebounce from "./../../hooks/useDebounce";
import { PropTypes } from "prop-types";

function TreeSearch({ onShowResult, initialSearch = "" }) {
  const [search, setSearch] = useState(initialSearch);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    onShowResult(debouncedSearch);
  }, [debouncedSearch, onShowResult]);

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className="item__wrapper item-level-0">
      <input placeholder="Поиск" onChange={updateSearch} value={search} />
    </div>
  );
}

TreeSearch.propTypes = {
  initialSearch: PropTypes.string,
  onShowResult: PropTypes.func,
};

export default TreeSearch;
