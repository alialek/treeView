import React from "react";

export default function TreeSearch() {
  const [search, setSearch] = useState("");
  return (
    <div>
      <input onChange={updateSearch} value={search} />
    </div>
  );
}
