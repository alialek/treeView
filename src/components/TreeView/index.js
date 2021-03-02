import React, { useState } from "react";
import TreeBranch from "./TreeBranch";
import StoreProvider from "./TreeContext";

export default function TreeView({ data, isLoading, error }) {
  const [opennedBranches, setOpennedBranches] = useState([]);
  const [active, setActive] = useState(null);

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
    id === active ? setActive(null) : setActive(id);
  };
  return (
    <div className="treeview">
      {isLoading && <div>Загрузка</div>}
      {error && <div>{error}</div>}
      {data &&
        data.topLevelIds.map((id) => (
          <TreeBranch
            changeActiveItem={changeActiveItem}
            setActive={setActive}
            changeBranchView={changeBranchView}
            active={active}
            opennedBranches={opennedBranches}
            data={data}
            key={id}
            page={data.entities.pages[id]}
          />
        ))}
    </div>
  );
}
