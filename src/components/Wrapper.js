import React from "react";
import useFetch from "./../hooks/useFetch";
import TreeView from "./TreeView/index";

export default function Wrapper() {
  const { response, error, isLoading } = useFetch("/data/HelpTOC.json", {});
  const onPageSelect = (id) => console.log("Page selected", id);
  const initialID = "welcome";
  return (
    <div>
      <TreeView
        data={response}
        error={error}
        isLoading={isLoading}
        onPageSelect={onPageSelect}
        initialID={initialID}
      />
    </div>
  );
}
