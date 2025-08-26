"use client";

import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

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
  }, [searchTerm]);

  const visible = useMemo(() => {
    // to do: this should probably be debounced as well ^^
    const q = searchTerm.trim().toLowerCase();
    if (!q) return advocates;
    return advocates.filter((a) => {
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
  }, [advocates, searchTerm]);

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
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
      <br />
      <br />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>City</th>
              <th>Degree</th>
              <th>Specialties</th>
              <th>Years of Experience</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {visible.length ? (
              visible.map((advocate, idx) => {
                return (
                  <tr key={idx}>
                    <td>{advocate.firstName}</td>
                    <td>{advocate.lastName}</td>
                    <td>{advocate.city}</td>
                    <td>{advocate.degree}</td>
                    <td>
                      {advocate.specialties.map((s, i) => (
                        <div key={i}>{s}</div>
                      ))}
                    </td>
                    <td>{advocate.yearsOfExperience}</td>
                    <td>{advocate.phoneNumber}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>No results found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </main>
  );
}
