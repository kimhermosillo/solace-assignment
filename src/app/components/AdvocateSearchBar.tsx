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
      <div className="flex items-center gap-2">
        <input
          id="search"
          className="w-full rounded-xl border px-4 py-2"
          placeholder="Name, city, specialty..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search advocates"
        />
          <button
            type="button"
            onClick={() => setSearchTerm("")}
            className="text-sm underline"
            disabled={!searchTerm}
            aria-label="Clear search"
          >
            Clear
          </button>
      </div>
  );
};

export default AdvocateSearchBar;
