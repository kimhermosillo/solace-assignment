import React, { ReactElement } from "react";

interface AdvocateSearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const AdvocateSearchBar = ({
  searchTerm,
  setSearchTerm,
}: AdvocateSearchBarProps): ReactElement => {
  return (
    <div>
      <p>Search</p>
      <p>
        Searching for: <span id="search-term"></span>
      </p>
      <input
        style={{ border: "1px solid black" }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={() => setSearchTerm("")}>Reset Search</button>
    </div>
  );
};

export default AdvocateSearchBar;
