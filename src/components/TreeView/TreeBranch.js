import React, { useMemo } from "react";
import { StoreContext } from "./TreeContext";

const TreeBranch = ({
  page,
  data,
  active,
  opennedBranches,
  changeActiveItem,
  changeBranchView,
}) => {
  const { id, title, url, level, parentId, pages, anchors } = page;
  const isLeaf = useMemo(() => !pages?.length, [pages]);
  const isActive = useMemo(() => id === active, [id, active]);
  return (
    <div
      className={`treeview__block ${isActive ? "treeview__block--active" : ""}`}
    >
      <div className={`treeview__item item`}>
        <div
          className={`${
            isLeaf ? "leaf" : "item"
          }-level-${level} item__wrapper `}
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
          <span
            onClick={() => changeActiveItem(id)}
            className={`item__title ${isActive ? "item__title--active" : ""}`}
          >
            {title}
          </span>
        </div>
      </div>
      <div>
        {opennedBranches.includes(id) &&
          pages.map((page) => (
            <TreeBranch
              changeActiveItem={changeActiveItem}
              changeBranchView={changeBranchView}
              active={active}
              opennedBranches={opennedBranches}
              data={data}
              key={page}
              page={data.entities.pages[page]}
            />
          ))}
        {isActive &&
          anchors?.length &&
          anchors.map((anchor) => (
            <TreeBranch
              changeActiveItem={changeActiveItem}
              changeBranchView={changeBranchView}
              active={active}
              opennedBranches={opennedBranches}
              data={data}
              key={anchor}
              page={data.entities.anchors[anchor]}
            />
          ))}
      </div>
    </div>
  );
};
export default TreeBranch;
