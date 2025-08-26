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
    <table className="table-auto">
      <thead>
        <tr className="bg-gray-50 text-left">
          {TABLE_HEADER_OPTIONS.map((option: string) => (
            <th>{option}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {visible.length ? (
          visible.map((advocate: AdvocateType, idx: number) => {
            return (
              <tr key={idx} className="border-t hover:bg-gray-50">
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  <div className="flex flex-wrap gap-1">
                    {advocate.specialties.map((s, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs"
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
