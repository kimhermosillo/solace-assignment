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
        className="flex-1 rounded-full border border-gray-300 px-4 py-2 shadow-sm
               focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
        placeholder="Name, city, specialty..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search advocates"
      />
      <button
        type="button"
        onClick={() => setSearchTerm("")}
        className="text-sm text-emerald-700 hover:text-emerald-900 disabled:opacity-40"
        disabled={!searchTerm}
        aria-label="Clear search"
      >
        Clear
      </button>
    </div>
  );
};

export default AdvocateSearchBar;
