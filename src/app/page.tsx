"use client";

import { useEffect, useMemo, useState } from "react";
import { AdvocateType } from "./types/Advocates";
import useDebounce from "./hooks/useDebounce";
import AdvocateTable from "./components/AdvocateTable";
import AdvocateSearchBar from "./components/AdvocateSearchBar";

export default function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

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

  const visible = useMemo(() => {
    const q = debouncedSearchTerm.trim().toLowerCase();
    if (!q) return advocates;
    return advocates.filter((a: AdvocateType) => {
      const first = (a.firstName ?? "").toLowerCase();
      const last = (a.lastName ?? "").toLowerCase();
      const city = (a.city ?? "").toLowerCase();
      const degree = (a.degree ?? "").toLowerCase();
      const specs = (a.specialties ?? []).join(" ").toLowerCase();
      const years = String(a.yearsOfExperience ?? "").toLowerCase();
      return (
        first.includes(q) ||
        last.includes(q) ||
        city.includes(q) ||
        degree.includes(q) ||
        specs.includes(q) ||
        years.includes(q)
      );
    });
  }, [advocates, debouncedSearchTerm]);

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <AdvocateSearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <br />
      <br />
      {loading ? <div>Loading...</div> : <AdvocateTable visible={visible} />}
    </main>
  );
}
