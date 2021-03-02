import React, { createContext, useState } from "react";

export const StoreContext = createContext(null);

export default ({ children }) => {
  const [opennedBranches, setOpennedBranches] = useState([]);
  const [active, setActive] = useState(null);

  const isLeaf = (pages) => !pages?.length;

  const isActive = (id) => id === active;

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

  const store = {
    active,
    setActive,
    opennedBranches,
    setOpennedBranches,
    isLeaf,
    isActive,
    changeActiveItem,
    changeBranchView,
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
