import React from "react";
import { PropTypes } from "prop-types";
import chevron from "../assets/chevron.svg";

const TreeBranch = ({
  page,
  allPages,
  allAnchors,
  changeActiveItem,
  changeBranchView,
  handleKeyboard,
  isAnchor,
  parentLevel,
  activePage,
  openedBranches,
  activeAnchor,
}) => {
  const { id, title, url, level, pages, anchors, anchor } = page;

  const isLeaf = !pages?.length;
  const isActive = id === activePage || id === activeAnchor;
  const isBranchOpened = openedBranches.includes(id);

  const componentProps = {
    changeActiveItem,
    changeBranchView,
    handleKeyboard,
    allPages,
    allAnchors,
    activePage,
    activeAnchor,
    openedBranches,
  };
  return (
    <div
      className={`treeview__block ${isActive ? "treeview__block--active" : ""}`}
    >
      <div
        tabIndex="0"
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
                isBranchOpened && `item__toggle--active`
              }`}
            >
              <img src={chevron} alt="chevron" />
            </span>
          )}
          <div
            onClick={() => changeActiveItem(id, isAnchor, url, anchor)}
            className={`item__title ${isActive ? "item__title--active" : ""}`}
          >
            {title}
          </div>
        </div>
      </div>
      {isBranchOpened && (
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
          {isActive &&
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

TreeBranch.propTypes = {
  page: PropTypes.object,
  allPages: PropTypes.object,
  allAnchors: PropTypes.object,
  changeActiveItem: PropTypes.func,
  changeBranchView: PropTypes.func,
  handleKeyboard: PropTypes.func,
  isAnchor: PropTypes.bool,
  parentLevel: PropTypes.number,
  activePage: PropTypes.string,
  openedBranches: PropTypes.array,
  activeAnchor: PropTypes.string,
};

export default React.memo(TreeBranch);
