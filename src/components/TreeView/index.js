import React, { useState, useEffect } from "react";
import TreeBranch from "./TreeBranch";
import TreeLoading from "./TreeLoading";

export default function TreeView({
  data,
  isLoading,
  error,
  onPageSelect,
  initialID,
}) {
  const [opennedBranches, setOpennedBranches] = useState([]);
  const [active, setActive] = useState(null);
  const [search, setSearch] = useState("");
  const [searchTree, setSearchTree] = useState({});

  useEffect(() => {
    setActive(initialID);
    if (data) {
      setOpennedBranches((prevState) => [...prevState, initialID]);
      let id = initialID;

      while (data.entities.pages[id].parentId) {
        id = data.entities.pages[id].parentId;
        setOpennedBranches((prevState) => [...prevState, id]);
      }
    }
  }, [initialID, data]);

  const updateSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value.length >= 3) {
      let newData = { entities: { pages: {}, anchors: {} }, topLevelIds: [] };
      Object.keys(data.entities.pages).forEach((page) => {
        if (
          data.entities.pages[page].title
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
        ) {
          while (data.entities.pages[page] && !newData.entities.pages[page]) {
            newData.entities.pages[page] = data.entities.pages[page];

            if (data.entities.pages[page].level === 0) {
              newData.topLevelIds.push(data.entities.pages[page].id);
            }

            page = data.entities.pages[page].parentId;
          }
        }
      });
      console.log(newData);
      setSearchTree(newData);
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

  const changeBranchView = (id) => {
    const branchIndex = opennedBranches.indexOf(id);
    if (branchIndex === -1) {
      setOpennedBranches((prevState) => [...prevState, id]);
      return;
    }

    setOpennedBranches((prevState) => [
      ...prevState.slice(0, branchIndex),
      ...prevState.slice(branchIndex + 1, prevState.length),
    ]);
  };

  const changeActiveItem = (id) => {
    if (id === active) {
      return setActive(null);
    }
    setActive(id);
    onPageSelect(id);
    if (!opennedBranches.includes(id)) {
      changeBranchView(id);
    }
  };
  return (
    <div className="treeview">
      {isLoading && <TreeLoading />}
      {error && <div>{error}</div>}
      {data && (
        <div>
          <input onChange={updateSearch} value={search} />
          {search.length < 3 &&
            data.topLevelIds.map((id) => (
              <TreeBranch
                changeActiveItem={changeActiveItem}
                setActive={setActive}
                changeBranchView={changeBranchView}
                active={active}
                opennedBranches={opennedBranches}
                handleKeyboard={handleKeyboard}
                data={data}
                key={id}
                page={data.entities.pages[id]}
              />
            ))}{" "}
          {search.length >= 3 && searchTree.topLevelIds.toString()}
          {search.length >= 3 &&
            searchTree.topLevelIds.map((id) => (
              <TreeBranch
                changeActiveItem={changeActiveItem}
                setActive={setActive}
                changeBranchView={changeBranchView}
                active={active}
                opennedBranches={opennedBranches}
                handleKeyboard={handleKeyboard}
                data={searchTree}
                key={id}
                page={searchTree.entities.pages[id]}
              />
            ))}
        </div>
      )}
    </div>
  );
}
