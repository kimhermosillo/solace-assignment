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
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const c = new AbortController();
    setLoading(true);

    fetch(`/api/advocates?page=${page}&pageSize=${pageSize}`, {
      signal: c.signal,
    })
      .then((r) => r.json())
      .then(({ data = [], totalPages = 1 }) => {
        setAdvocates(data);
        setTotalPages(totalPages);
      })
      .catch((e) => {
        if (e.name !== "AbortError") console.log(e.message);
      })
      .finally(() => setLoading(false));

    return () => c.abort();
  }, [page, pageSize]);

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

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm, pageSize]);

  return (
    <>
      <main className="p-6 space-y-6">
        <header className="space-y-1">
          <h1 className="text-3xl font-bold text-emerald-700">
            Solace Advocates
          </h1>
          <p className="text-sm text-gray-600">
            Search and explore our advocate network to find your best match.
          </p>
        </header>

        <div className="flex justify-between items-end gap-6">
          <AdvocateSearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <div>
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

        {loading ? (
          <div className="text-gray-500">Loading advocates…</div>
        ) : (
          <AdvocateTable visible={filteredAdvocates} />
        )}
        {filteredAdvocates.length > 1 && (
          <div className="flex justify-center items-center gap-4">
            <button
              className="px-4 py-2 rounded-md border text-sm
                 text-gray-700 hover:bg-gray-100 disabled:opacity-40"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page <span className="font-medium">{page}</span> of{" "}
              <span className="font-medium">{totalPages}</span>
            </span>
            <button
              className="px-4 py-2 rounded-md border text-sm
                 text-gray-700 hover:bg-gray-100 disabled:opacity-40"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </main>
    </>
  );
}
