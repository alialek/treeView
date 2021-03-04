import React, { useState, useEffect, useCallback } from "react";
import TreeBranch from "./TreeBranch.js";
import TreeLoading from "./TreeLoading";
import TreeSearch from "./TreeSearch";

export default function TreeView({
  anchors,
  topLevelIds,
  pages,
  isLoading,
  error,
  onPageSelect,
  initialID,
}) {
  const [opennedBranches, setOpennedBranches] = useState([]);
  const [active, setActive] = useState(null);
  const [search, setSearch] = useState("");
  const [searchAnchors, setSearchAnchors] = useState({});
  const [searchPages, setSearchPages] = useState({});
  const [searchTopLevelIds, setSearchTopLevelIds] = useState([]);
  const [isResultShown, setIsResultShown] = useState(false);

  useEffect(() => {
    if (initialID && pages) {
      changeActiveItem(initialID);
      let id = initialID;
      const opennedIds = [];
      while (pages[id].parentId) {
        opennedIds.push(pages[id].parentId);
        id = pages[id].parentId;
      }
      setOpennedBranches((prevState) => [...prevState, ...opennedIds]);
    }
  }, [initialID, pages]);

  const updateSearch = (bool, value) => {
    setIsResultShown(bool);
    console.log(bool);
    if (bool) {
      const newPages = {};
      const newAnchors = {};
      const newTopLevelIds = [];
      Object.keys(pages).forEach((page) => {
        if (pages[page].title.toLowerCase().includes(value.toLowerCase())) {
          while (pages[page] && !newPages[page]) {
            newPages[page] = pages[page];

            if (pages[page].level === 0) {
              newTopLevelIds.push(pages[page].id);
            }

            page = pages[page].parentId;
          }
        }
      });
      console.log(newTopLevelIds, newPages, newAnchors);
      setSearchTopLevelIds(newTopLevelIds);
      setSearchPages(newPages);
      setSearchAnchors(newAnchors);
    }
  };

  const handleKeyboard = (id, e) => {
    switch (e.keyCode) {
      case 32:
        changeBranchView(id);
        break;

      case 13:
        changeActiveItem(id);
        break;

      default:
        break;
    }
  };

  const changeBranchView = useCallback(
    (id) => {
      if (pages) console.log("here2", pages[id]);
      const branchIndex = opennedBranches.indexOf(id);
      if (branchIndex === -1) {
        setOpennedBranches((prevState) => [...prevState, id]);
        return;
      }

      setOpennedBranches((prevState) => [
        ...prevState.slice(0, branchIndex),
        ...prevState.slice(branchIndex + 1, prevState.length),
      ]);
    },
    [opennedBranches],
  );

  const changeActiveItem = useCallback(
    (id) => {
      if (id === active) {
        return setActive(null);
      }
      console.log("here", id);
      setActive(id);
      onPageSelect(id);
      if (!opennedBranches.includes(id)) {
        changeBranchView(id);
      }
    },
    [active],
  );
  return (
    <div className="treeview">
      {isLoading && <TreeLoading />}
      {error && <div>{error}</div>}
      {topLevelIds && (
        <div>
          <TreeSearch
            onShowResult={(bool, searchText) => updateSearch(bool, searchText)}
            value={search}
          />
          {!isResultShown &&
            topLevelIds.map((id) => (
              <TreeBranch
                changeActiveItem={changeActiveItem}
                setActive={setActive}
                changeBranchView={changeBranchView}
                active={active}
                opennedBranches={opennedBranches}
                handleKeyboard={handleKeyboard}
                allPages={pages}
                allAnchors={anchors}
                key={id}
                page={pages[id]}
              />
            ))}{" "}
          {isResultShown &&
            searchTopLevelIds.map((id) => (
              <TreeBranch
                changeActiveItem={changeActiveItem}
                setActive={setActive}
                changeBranchView={changeBranchView}
                active={active}
                opennedBranches={opennedBranches}
                handleKeyboard={handleKeyboard}
                allPages={searchPages}
                allAnchors={searchAnchors}
                key={id}
                page={searchPages[id]}
              />
            ))}
        </div>
      )}
    </div>
  );
}
