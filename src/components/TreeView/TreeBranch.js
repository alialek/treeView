import React, { useMemo } from "react";
import { StoreContext } from "./TreeContext";

const TreeBranch = ({
  page,
  allPages,
  allAnchors,
  active,
  opennedBranches,
  changeActiveItem,
  changeBranchView,
  handleKeyboard,
  isAnchor,
  parentLevel,
}) => {
  const { id, title, url, level, pages, anchors } = page;
  const isLeaf = !pages?.length;
  const isActive = id === active;
  return (
    <div
      className={`treeview__block ${isActive ? "treeview__block--active" : ""}`}
    >
      <div
        tabIndex="0 "
        onKeyDown={(e) => handleKeyboard(id, e)}
        className={`treeview__item item`}
      >
        <div
          className={`${isLeaf ? "leaf" : "item"}-level-${
            isAnchor ? parentLevel + level : level
          } item__wrapper `}
        >
          {!isLeaf && (
            <span
              onClick={() => changeBranchView(id)}
              className={`item__toggle ${
                opennedBranches.includes(id) && `item__toggle--active`
              }`}
            >
              ▸
            </span>
          )}
          <div
            onClick={() => changeActiveItem(id, isAnchor)}
            className={`item__title ${isActive ? "item__title--active" : ""}`}
          >
            {title}
          </div>
        </div>
      </div>
      {opennedBranches.includes(id) && (
        <div className="item__list">
          {pages?.length &&
            pages.map(
              (page) =>
                allPages[page] && (
                  <TreeBranch
                    changeActiveItem={changeActiveItem}
                    changeBranchView={changeBranchView}
                    active={active}
                    opennedBranches={opennedBranches}
                    allPages={allPages}
                    allAnchors={allAnchors}
                    key={page}
                    handleKeyboard={handleKeyboard}
                    page={allPages[page]}
                  />
                ),
            )}
          {isActive &&
            anchors?.length &&
            anchors.map((anchor) => (
              <TreeBranch
                changeActiveItem={changeActiveItem}
                changeBranchView={changeBranchView}
                active={active}
                handleKeyboard={handleKeyboard}
                opennedBranches={opennedBranches}
                allPages={allPages}
                allAnchors={allAnchors}
                key={anchor}
                page={allAnchors[anchor]}
                isAnchor={true}
                parentLevel={level}
              />
            ))}
        </div>
      )}
    </div>
  );
};
export default React.memo(TreeBranch);
