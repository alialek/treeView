import React from "react";
import useFetch from "./../hooks/useFetch";
import TreeView from "./TreeView/index";

export default function Wrapper() {
  const { response, error, isLoading } = useFetch("/data/HelpTOC.json", {});
  return (
    <div>
      <TreeView data={response} error={error} isLoading={isLoading} />
    </div>
  );
}
