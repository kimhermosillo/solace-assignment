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
        const { firstName, lastName, city, degree, yearsOfExperience, specialties } = a;
          const specs = (specialties ?? []).join(" ").toLowerCase();
          return (
            // todo: add first and last name
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
    <main style={{ margin: "24px" }}>
       <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Solace Advocates</h1>
        <p className="text-sm text-gray-600">
          Search and explore our advocate network to find your best match.
        </p>
      </header>
      <br />
      <br />
      <AdvocateSearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <br />
      <div className="w-40">
          <label className="text-sm font-medium mb-1 block">Rows / page</label>
          <select
            className="border rounded px-3 py-2 w-full"
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
      <br />
      {loading ? <div>Loading...</div> : <AdvocateTable visible={visible} />}
      <footer className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-medium">
              {totalPages === 0 ? 0 : pageStart + 1}–{Math.min(totalPages, pageStart + pageSize)}
            </span>{" "}
            of <span className="font-medium">{totalPages}</span>
          </p>
          <div className="flex items-center gap-2">
            <button
              className="border rounded px-3 py-1 disabled:opacity-40"
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
              className="border rounded px-3 py-1 disabled:opacity-40"
              onClick={nextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </footer>
    </main>
  );
}
