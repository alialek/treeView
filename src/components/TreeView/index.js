import React, { useState, useEffect, useCallback } from "react";
import { PropTypes } from "prop-types";
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
  initialAnchor,
}) {
  const [openedBranches, setOpenedBranches] = useState([]);
  const [activePage, setActivePage] = useState(null);
  const [activeAnchor, setActiveAnchor] = useState(null);
  const [searchPages, setSearchPages] = useState({});
  const [searchTopLevelIds, setSearchTopLevelIds] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const updateSearch = useCallback(
    (search) => {
      if (search) {
        const newPages = {};
        const newTopLevelIds = [];
        const openedIds = [];

        Object.keys(pages).forEach((page) => {
          if (pages[page].title.toLowerCase().includes(search.toLowerCase())) {
            while (pages[page] && !newPages[page]) {
              newPages[page] = pages[page];
              if (pages[page].level === 0) {
                newTopLevelIds.push(pages[page].id);
              }

              openedIds.push(page);

              page = pages[page].parentId;
            }
          }
        });
        setOpenedBranches(openedIds);
        setSearchTopLevelIds(newTopLevelIds);
        setSearchPages(newPages);
        setShowSearchResults(true);
      } else {
        setShowSearchResults(false);
      }
    },
    [pages],
  );

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
        if (!openedBranches.includes(id)) {
          changeBranchView(id);
        }
        setActivePage(id);
      } else {
        setActiveAnchor(id);
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
  const drawTreeById = useCallback(
    (id) => {
      changeActiveItem(id);
      const openedIds = [];
      while (pages[id].parentId) {
        openedIds.push(pages[id].parentId);
        id = pages[id].parentId;
      }
      setOpenedBranches((prevState) => [...prevState, ...openedIds]);
    },
    [changeActiveItem, pages],
  );

  useEffect(() => {
    if (initialID && pages) {
      drawTreeById(initialID);
    }
  }, [initialID, pages, drawTreeById]);

  useEffect(() => {
    if (initialAnchor && anchors) {
      setActiveAnchor(initialAnchor);
      drawTreeById(anchors[initialAnchor].parentId);
    }
  }, [initialAnchor, drawTreeById, anchors]);

  return (
    <div className="treeview">
      {isLoading && <TreeLoading />}
      {error && <div>Ошибка</div>}
      {topLevelIds && (
        <>
          <TreeSearch
            initialSearch={initialSearch}
            onShowResult={updateSearch}
          />
          {!showSearchResults &&
            topLevelIds.map((id) => (
              <TreeBranch
                changeActiveItem={changeActiveItem}
                changeBranchView={changeBranchView}
                setActive={setActivePage}
                handleKeyboard={handleKeyboard}
                allPages={pages}
                allAnchors={anchors}
                key={id}
                page={pages[id]}
                activePage={activePage}
                activeAnchor={activeAnchor}
                openedBranches={openedBranches}
              />
            ))}{" "}
          {showSearchResults && (
            <>
              {searchTopLevelIds.length === 0 && (
                <div className="item-level-0 item__wrapper ">
                  Ничего не найдено
                </div>
              )}
              {searchTopLevelIds.length > 0 &&
                searchTopLevelIds.map((id) => (
                  <TreeBranch
                    changeActiveItem={changeActiveItem}
                    changeBranchView={changeBranchView}
                    setActive={setActivePage}
                    handleKeyboard={handleKeyboard}
                    allPages={searchPages}
                    allAnchors={anchors}
                    key={id}
                    page={searchPages[id]}
                    activePage={activePage}
                    activeAnchor={activeAnchor}
                    openedBranches={openedBranches}
                  />
                ))}
            </>
          )}
        </>
      )}
    </div>
  );
}

TreeView.propTypes = {
  anchors: PropTypes.object,
  topLevelIds: PropTypes.array,
  pages: PropTypes.object,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  onPageSelect: PropTypes.func,
  initialID: PropTypes.string,
  initialSearch: PropTypes.string,
  initialAnchor: PropTypes.string,
};
