import React, { ReactElement } from "react";
import { AdvocateType } from "../types/Advocates";

interface AdvocateTableProps {
  visible: AdvocateType[];
}

const TABLE_HEADER_OPTIONS = [
  "First Name",
  "Last Name",
  "City",
  "Degree",
  "Specialties",
  "Years of Experience",
  "Phone Number",
];

const AdvocateTable = ({ visible }: AdvocateTableProps): ReactElement => {
  return (
    <table className="w-full border-collapse rounded-xl overflow-hidden shadow-sm bg-white">
      <thead>
        <tr className="bg-emerald-50 text-left text-gray-700">
          {TABLE_HEADER_OPTIONS.map((option: string, i: number) => (
            <th key={i} className="px-4 py-3 text-sm font-semibold">
              {option}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {visible.length ? (
          visible.map((advocate: AdvocateType, idx: number) => {
            return (
              <tr key={idx} className="border-t hover:bg-emerald-50 transition">
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  <div className="flex flex-wrap gap-1">
                    {advocate.specialties.map((s, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center rounded-full bg-emerald-100 text-emerald-800
                             px-2 py-0.5 text-xs font-medium opacity-90"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-3">{advocate.yearsOfExperience}</td>
                <td className="p-3">{advocate.phoneNumber}</td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td className="p-6 text-center text-gray-500" colSpan={7}>
              No results found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default AdvocateTable;
