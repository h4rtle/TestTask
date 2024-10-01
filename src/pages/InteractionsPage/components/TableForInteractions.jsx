import React, { useState, useEffect } from "react";
import { getInformationByTableForInteractions } from "../../../api/requests";
import CellInteractionsItem from "./CellInteractionsItem";
import {
  handleCellClick,
  handleCloseField,
  handleCellDelete,
  handleCellChange,
  handleNewObject,
} from "./Handlers";

const TableForInteractions = ({
  cells: propsCells,
  setCells,
  setServerResponse,
}) => {
  const [tableCells, setTableCells] = useState(propsCells);
  const [selectedCell, setSelectedCell] = useState(null);
  const [showField, setShowField] = useState(false);
  const [objectData, setObjectData] = useState({});

  useEffect(() => {
    const intervalId = setInterval(() => {
      requestData();
    }, 1000); // Обновление данных каждую секунду

    return () => clearInterval(intervalId); // Очистка интервала компонента
  }, []);

  useEffect(() => {
    setTableCells(propsCells);
  }, [propsCells]);

  const requestData = () => {
    getInformationByTableForInteractions()
      .then((data) => setTableCells(data.objects || []))
      .catch((error) => console.error(error));
  };

  return (
    <div className="table-field">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Имя</th>
            <th>Тип</th>
            <th>Описание</th>
          </tr>
        </thead>
        <tbody>
          {tableCells.map((cell, index) => (
            <CellInteractionsItem
              key={index}
              cell={cell}
              onClick={() =>
                handleCellClick(
                  cell,
                  setSelectedCell,
                  setShowField,
                  setObjectData
                )
              }
            />
          ))}
        </tbody>
      </table>
      {showField && (
        <div className="show-field">
          <p>Вы выбрали объект: {selectedCell.object_name}</p>
          <div className="change-delete-field">
            <div className="input-container">
              <div className="input-box">
                <span>Введите - "object_name"</span>
                <input
                  id="object_name"
                  type="text"
                  value={objectData.object_name || ""}
                  onChange={(e) =>
                    setObjectData({
                      ...objectData,
                      object_name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="input-box">
                <span>Введите - "object_type"</span>
                <input
                  id="object_type"
                  type="text"
                  value={objectData.object_type || ""}
                  onChange={(e) =>
                    setObjectData({
                      ...objectData,
                      object_type: e.target.value,
                    })
                  }
                />
              </div>
              <div className="input-box">
                <span>Введите - "object_description"</span>
                <input
                  id="object_description"
                  type="text"
                  value={objectData.object_description || ""}
                  onChange={(e) =>
                    setObjectData({
                      ...objectData,
                      object_description: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="button-container">
              <button
                className="btn btn-primary btn-sm"
                onClick={() =>
                  handleCellChange(
                    selectedCell,
                    objectData,
                    tableCells,
                    setTableCells,
                    setShowField,
                    setServerResponse
                  )
                }
              >
                Изменить
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() =>
                  handleCellDelete(
                    selectedCell,
                    tableCells,
                    setTableCells,
                    setShowField,
                    setServerResponse
                  )
                }
              >
                Удалить
              </button>
            </div>
          </div>
          <div className="close-button-container">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => handleCloseField(setShowField)}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableForInteractions;
