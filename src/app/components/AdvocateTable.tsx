import React, { ReactElement } from "react";
import { AdvocateType } from "../types/Advocates";

interface AdvocateTableProps {
  visible: AdvocateType[];
}

const AdvocateTable = ({ visible }: AdvocateTableProps): ReactElement => {
  return (
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
          visible.map((advocate: AdvocateType, idx: number) => {
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
  );
};

export default AdvocateTable;
