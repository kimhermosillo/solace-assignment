"use client";

import { useEffect, useMemo, useState } from "react";
import { AdvocateType } from "./types/Advocates";
import useDebounce from "./hooks/useDebounce";
import AdvocateTable from "./components/AdvocateTable";
import AdvocateSearchBar from "./components/AdvocateSearchBar";

const PAGE_SIZE_OPTIONS = [5, 10, 20];

export default function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/advocates?search=${searchTerm}`);
        const json = await res.json();
        setAdvocates(json.data);
      } catch (e) {
        console.error("Failed to fetch advocates", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [debouncedSearchTerm]);

  const filteredAdvocates = useMemo(() => {
    const q = debouncedSearchTerm.trim().toLowerCase();
    const filtered = q
      ? advocates.filter((a: AdvocateType) => {
          const {
            firstName,
            lastName,
            city,
            degree,
            yearsOfExperience,
            specialties,
          } = a;
          const specs = (specialties ?? []).join(" ").toLowerCase();
          const fullName = `${a.firstName} ${a.lastName}`.toLowerCase();
          return (
            fullName.includes(q) ||
            firstName.toLowerCase().includes(q) ||
            lastName.toLowerCase().includes(q) ||
            city.toLowerCase().includes(q) ||
            degree.toLowerCase().includes(q) ||
            specs.includes(q) ||
            String(yearsOfExperience).includes(q)
          );
        })
      : advocates.slice();

    return filtered;
  }, [advocates, debouncedSearchTerm]);

  const totalAdvocates = filteredAdvocates.length;
  const totalPages = Math.max(1, Math.ceil(totalAdvocates / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * pageSize;
  const visible = filteredAdvocates.slice(pageStart, pageStart + pageSize);

  const nextPage = () => setPage((p) => Math.min(totalPages, p + 1));
  const prevPage = () => setPage((p) => Math.max(1, p - 1));

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm, pageSize]);

  return (
    <>
      <main className="p-4 m-4">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-emerald-700">
            Solace Advocates
          </h1>
          <p className="text-sm text-gray-600">
            Search and explore our advocate network to find your best match.
          </p>
        </header>
        <div className="flex justify-between p-4">
          <AdvocateSearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <div className="w-40 flex end items-center">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rows / page
            </label>
            <select
              className="border rounded-md px-3 py-2 shadow-sm
               focus:border-emerald-600 focus:ring-emerald-200"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {PAGE_SIZE_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>
        {loading ? <div>Loading...</div> : <AdvocateTable visible={visible} />}
        <div className="flex justify-center items-center m-2 gap-2">
          <button
            className="px-4 py-2 rounded-md border text-sm
            text-gray-700 hover:bg-gray-100 disabled:opacity-40"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-sm">
            Page <span className="font-medium">{currentPage}</span> of{" "}
            <span className="font-medium">{totalPages}</span>
          </span>
          <button
            className="px-4 py-2 rounded-md border text-sm
                  text-gray-700 hover:bg-gray-100 disabled:opacity-40"
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </main>
    </>
  );
}
