import React, { useMemo } from "react";
import { StoreContext } from "./TreeContext";

const TreeBranch = ({
  page,
  allPages,
  allAnchors,
  changeActiveItem,
  changeBranchView,
  handleKeyboard,
  isAnchor,
  parentLevel,
  isActive,
  isBranchOpenned,
}) => {
  const { id, title, url, level, pages, anchors } = page;
  const isLeaf = !pages?.length;
  const componentProps = {
    changeActiveItem,
    changeBranchView,
    handleKeyboard,
    allPages,
    allAnchors,
    isActive,
    isBranchOpenned,
  };
  return (
    <div
      className={`treeview__block ${
        isActive(id) ? "treeview__block--active" : ""
      }`}
    >
      <div
        tabIndex="-1"
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
                isBranchOpenned(id) && `item__toggle--active`
              }`}
            >
              ▸
            </span>
          )}
          <div
            onClick={() => changeActiveItem(id, isAnchor)}
            className={`item__title ${
              isActive(id) ? "item__title--active" : ""
            }`}
          >
            {title}
          </div>
        </div>
      </div>
      {isBranchOpenned(id) && (
        <div className="item__list">
          {pages?.length &&
            pages.map(
              (page) =>
                allPages[page] && (
                  <TreeBranch
                    {...componentProps}
                    key={page}
                    page={allPages[page]}
                  />
                ),
            )}
          {isActive(id) &&
            anchors?.length &&
            anchors.map((anchor) => (
              <TreeBranch
                {...componentProps}
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
