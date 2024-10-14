import { getInformationForTable } from "../api/requests";
import React, { useEffect, useState } from "react";
import CellItem from "./CellItem";

const Table = ({ filterTypes, startDate, endDate }) => {
  const [cells, setCells] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const responseData = async () => {
      try {
        const data = await getInformationForTable();
        setCells(data.events);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    responseData();
    const intervalId = setInterval(responseData, 3000); // вызывается каждые 3 секунды

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const filteredCells = cells.filter((cell) => {
    if (filterTypes.warning && cell.type === "warning") return true;
    if (filterTypes.critical && cell.type === "critical") return true;
    if (filterTypes.info && cell.type === "info") return true;
    return false;
  });

  const filteredCellsByDate = filteredCells.filter((cell) => {
    const cellDate = new Date(cell.date);

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      return cellDate >= start && cellDate <= end;
    } else if (startDate) {
      const start = new Date(startDate);
      return cellDate >= start;
    } else if (endDate) {
      const end = new Date(endDate);
      return cellDate <= end;
    }
    return true;
  });

  // Ограничиваем количество строк до 30
  const limitedCells = filteredCellsByDate.slice(0, 30);

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
          {limitedCells.map((cell, index) => (
            <CellItem key={index} cell={cell} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
