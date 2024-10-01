import React, { useState } from "react";
import Table from "./Table";
const Filter = ({ filterTypes, setFilterTypes }) => {
  const handleFilterChange = (type) => {
    setFilterTypes((prevFilterTypes) => ({
      ...prevFilterTypes,
      [type]: !prevFilterTypes[type],
    })); // обновляет содержимое массива с объектом
  };

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <>
      <div className="filter-field">
        <div className="select-container">
          <p>Выберите параметр для отображаения : </p>
          <div className="filter-cell">
            <input
              type="checkbox"
              checked={filterTypes.warning}
              onChange={() => handleFilterChange("warning")}
            />
            <p>warning</p>
          </div>
          <div className="filter-cell">
            <input
              type="checkbox"
              checked={filterTypes.critical}
              onChange={() => handleFilterChange("critical")}
            />
            <p>critical</p>
          </div>
          <div className="filter-cell">
            <input
              type="checkbox"
              checked={filterTypes.info}
              onChange={() => handleFilterChange("info")}
            />
            <p>info</p>
          </div>
        </div>
        <div className="select-date-container">
          <p>Выберите дату :</p>
          <div className="date-pick-field">
            <span>С</span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="date-pick-field">
            <span>По</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
      </div>
      <Table
        filterTypes={filterTypes}
        startDate={startDate}
        endDate={endDate}
      />
    </>
  );
};

export default Filter;
