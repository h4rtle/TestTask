import React from "react";
import CellItem from "./CellItem";

const Table = ({ cells, loading }) => {
  if (loading) {
    return <p>Загрузка...</p>;
  }

  return (
    <div className="table-field">
      <table>
        <thead>
          <tr>
            <th>Дата</th>
            <th>Время</th>
            <th>События</th>
          </tr>
        </thead>
        <tbody>
          {cells.map((cell, index) => (
            <CellItem key={index} cell={cell} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
