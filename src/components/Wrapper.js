import React from "react";
import useFetch from "./../hooks/useFetch";
import TreeView from "./TreeView/index";
import tree from "../data/HelpTOC.json";

export default function Wrapper() {
  const { response, error, isLoading } = useFetch(tree);
  const onPageSelect = (isAnchor, url, anchor) =>
    console.log(
      `${isAnchor ? "Anchor" : "Page"} selected with url: ${url} ${
        isAnchor ? `and anchor: ${anchor}` : ""
      }`,
    );
  const initialID = "welcome";
  const initialSearch = "wel";
  const initialAnchor = "Docker_ps#docker_limitations";
  return (
    <div>
      <TreeView
        topLevelIds={response?.topLevelIds}
        pages={response?.entities.pages}
        anchors={response?.entities.anchors}
        error={error}
        isLoading={isLoading}
        onPageSelect={onPageSelect}
      />
    </div>
  );
}
