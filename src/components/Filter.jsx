import React, { useState, useEffect } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getInformationForTable } from "../api/requests";
import Table from "./Table";
import { parse, isAfter, isBefore, isEqual } from "date-fns";

const Filter = () => {
  const [cells, setCells] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [limit, setLimit] = useState(10);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

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
    const intervalId = setInterval(responseData, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleLimitChange = (event) => {
    setLimit(Number(event.target.value));
  };

  const handleToggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const parseDate = (dateString) => {
    return parse(dateString, "dd-MM-yyyy", new Date());
  };

  const filteredCells = cells
    .filter((cell) => {
      const isTypeMatch = selectedOption === "" || cell.type === selectedOption;

      const cellDate = parseDate(cell.date);

      let isDateMatch = true;

      if (startDate && endDate) {
        isDateMatch =
          (isAfter(cellDate, startDate) || isEqual(cellDate, startDate)) &&
          (isBefore(cellDate, endDate) || isEqual(cellDate, endDate));
      } else if (startDate) {
        isDateMatch =
          isAfter(cellDate, startDate) || isEqual(cellDate, startDate);
      } else if (endDate) {
        isDateMatch = isBefore(cellDate, endDate) || isEqual(cellDate, endDate);
      }

      return isTypeMatch && isDateMatch;
    })
    .slice(0, limit);

  return (
    <>
      <button onClick={handleToggleFilter}>
        {isFilterVisible ? "Скрыть сортировку" : "Сортировка"}
      </button>
      {isFilterVisible && (
        <div className="filter-field">
          <div className="select-container">
            <p>Выберите тип события для отображения:</p>
            <div className="filter-cell">
              <select value={selectedOption} onChange={handleSelectChange}>
                <option value="">Все типы</option>
                <option value="critical">critical</option>
                <option value="warning">warning</option>
                <option value="info">info</option>
              </select>
            </div>
          </div>
          <div className="select-date-container">
            <p>Выберите дату:</p>
            <div className="date-pick-field">
              <span>С</span>
              <ReactDatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd.MM.yyyy"
                placeholderText="Выберите дату"
              />
            </div>
            <div className="date-pick-field">
              <span>По</span>
              <ReactDatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="dd.MM.yyyy"
                placeholderText="Выберите дату"
              />
            </div>
          </div>
          <div className="limit-container">
            <p>Ограничить количество событий:</p>
            <input
              type="number"
              value={limit}
              onChange={handleLimitChange}
              min="1"
              placeholder="Введите количество"
            />
          </div>
        </div>
      )}
      <Table cells={filteredCells} loading={loading} />
    </>
  );
};

export default Filter;
