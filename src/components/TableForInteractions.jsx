import React, { useState, useEffect } from "react";
import { requestData } from "../api/requests";
import {
  handleCellClick,
  handleCellChange,
  handleCellDelete,
} from "./Handlers";
import CellInteractionsItem from "./CellInteractionsItem";

const TableForInteractions = ({ setCells, setServerResponse }) => {
  const [tableCells, setTableCells] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null);
  const [showField, setShowField] = useState(false);
  const [objectData, setObjectData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await requestData(setTableCells, setCells);
        setError(null);
      } catch (err) {
        setError("Связь с сервером оборвалась. Пожалуйста, попробуйте позже.");
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 1000);
    return () => clearInterval(intervalId);
  }, [setCells]);

  return (
    <div className="table-for-interactions">
      {error && <div className="table-for-interactions__error">{error}</div>}{" "}
      {/* Уведомление об ошибке */}
      <table className="table-for-interactions__table">
        <thead>
          <tr className="table-for-interactions__row">
            <th className="table-for-interactions__header">ID</th>
            <th className="table-for-interactions__header">Имя</th>
            <th className="table-for-interactions__header">Тип</th>
            <th className="table-for-interactions__header">Описание</th>
          </tr>
        </thead>
        <tbody>
          {tableCells.map((cell) => (
            <CellInteractionsItem
              key={cell.object_id}
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
        <div className="table-for-interactions__details">
          <p className="table-for-interactions__selected-object">
            Вы выбрали объект: {selectedCell.object_name}
          </p>
          <div className="table-for-interactions__actions">
            <div className="table-for-interactions__input-container">
              <div className="table-for-interactions__input-box">
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
              <div className="table-for-interactions__input-box">
                <span>Выберите - "object_type"</span>
                <select
                  value={objectData.object_type || ""}
                  onChange={(e) =>
                    setObjectData({
                      ...objectData,
                      object_type: e.target.value,
                    })
                  }
                >
                  <option value="">Выберите тип объекта</option>
                  <option value="EMS">EMS</option>
                  <option value="Network node">Network node</option>
                  <option value="Data Element SNMP">Data Element SNMP</option>
                </select>
              </div>
              <div className="table-for-interactions__input-box">
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
            <div className="table-for-interactions__button-container">
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
          <div className="table-for-interactions__close-button-container">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => setShowField(false)}
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
