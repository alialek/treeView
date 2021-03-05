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
  initialSearch,
}) {
  const [openedBranches, setOpenedBranches] = useState([]);
  const [activePage, setActivePage] = useState(null);
  const [searchAnchors, setSearchAnchors] = useState({});
  const [searchPages, setSearchPages] = useState({});
  const [searchTopLevelIds, setSearchTopLevelIds] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const updateSearch = (search) => {
    if (search) {
      const newPages = {};
      const newAnchors = {};
      const newTopLevelIds = [];

      Object.keys(pages).forEach((page) => {
        if (pages[page].title.toLowerCase().includes(search.toLowerCase())) {
          while (pages[page] && !newPages[page]) {
            newPages[page] = pages[page];
            if (pages[page].level === 0) {
              newTopLevelIds.push(pages[page].id);
            }
            page = pages[page].parentId;
          }
        }
      });

      setSearchTopLevelIds(newTopLevelIds);
      setSearchPages(newPages);
      setSearchAnchors(newAnchors);
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  const changeBranchView = useCallback(
    (id) => {
      const branchIndex = openedBranches.indexOf(id);

      if (branchIndex === -1) {
        setOpenedBranches((prevState) => [...prevState, id]);
        return;
      }

      setOpenedBranches((prevState) => [
        ...prevState.slice(0, branchIndex),
        ...prevState.slice(branchIndex + 1, prevState.length),
      ]);
    },
    [openedBranches],
  );

  const changeActiveItem = useCallback(
    (id, isAnchor, url, anchor) => {
      if (!isAnchor) {
        if (id === activePage) {
          return setActivePage(null);
        }
        setActivePage(id);
        if (!openedBranches.includes(id) && !isAnchor) {
          changeBranchView(id);
        }
      }
      onPageSelect(isAnchor, url, anchor);
    },
    [activePage, changeBranchView, onPageSelect, openedBranches],
  );
  const handleKeyboard = useCallback(
    (id, e) => {
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
    },
    [changeBranchView, changeActiveItem],
  );

  useEffect(() => {
    if (initialID && pages) {
      changeActiveItem(initialID);
      let id = initialID;
      const openedIds = [];
      while (pages[id].parentId) {
        openedIds.push(pages[id].parentId);
        id = pages[id].parentId;
      }
      setOpenedBranches((prevState) => [...prevState, ...openedIds]);
    }
  }, [initialID, pages]);

  return (
    <div className="treeview">
      {isLoading && <TreeLoading />}
      {error && <div>{error}</div>}
      {topLevelIds && (
        <>
          <TreeSearch
            initialSearch={initialSearch}
            onShowResult={(searchText) => updateSearch(searchText)}
          />
          {!showSearchResults &&
            topLevelIds.map((id) => (
              <TreeBranch
                changeActiveItem={changeActiveItem}
                setActive={setActivePage}
                changeBranchView={changeBranchView}
                handleKeyboard={handleKeyboard}
                allPages={pages}
                allAnchors={anchors}
                key={id}
                page={pages[id]}
                activePage={activePage}
                openedBranches={openedBranches}
              />
            ))}{" "}
          {showSearchResults &&
            searchTopLevelIds.map((id) => (
              <TreeBranch
                changeActiveItem={changeActiveItem}
                changeBranchView={changeBranchView}
                setActive={setActivePage}
                handleKeyboard={handleKeyboard}
                allPages={searchPages}
                allAnchors={searchAnchors}
                key={id}
                page={searchPages[id]}
                activePage={activePage}
                openedBranches={openedBranches}
              />
            ))}
        </>
      )}
    </div>
  );
}
