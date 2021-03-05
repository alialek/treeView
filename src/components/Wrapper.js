import React from "react";
import useFetch from "./../hooks/useFetch";
import TreeView from "./TreeView/index";

export default function Wrapper() {
  const { response, error, isLoading } = useFetch("/data/HelpTOC.json", {});
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
