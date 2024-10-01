import React, { useState } from "react";
import { changeInformationByTableForInteractions } from "../../../api/requests";
import { handleNewObject } from "./Handlers";

const AddObjects = ({
  tableCells,
  setTableCells,
  setServerResponse,
  serverResponse,
}) => {
  const [objectName, setObjectName] = useState("");
  const [objectType, setObjectType] = useState("");
  const [objectDescription, setObjectDescription] = useState("");

  const handleAddObject = () => {
    if (!objectName || !objectType || !objectDescription) {
      console.error("Недостаточно данных для добавления объекта");
      return;
    }

    const addObjectData = {
      operation_type: "insert",
      data: {
        object_name: objectName,
        object_type: objectType,
        object_description: objectDescription,
      },
    };

    changeInformationByTableForInteractions(addObjectData)
      .then((response) => {
        if (response && response.operation === "insert") {
          console.log("Объект добавлен успешно");
          setObjectName("");
          setObjectType("");
          setObjectDescription("");
          handleNewObject(
            {
              object_name: objectName,
              object_type: objectType,
              object_description: objectDescription,
            },
            tableCells,
            setTableCells,
            setServerResponse
          );
        } else {
          console.error("Ошибка добавления объекта:", response);
          setServerResponse(`Ошибка: ${response}`);
        }
      })
      .catch((error) => {
        console.error("Ошибка добавления объекта:", error);
        setServerResponse(`Ошибка: ${error}`);
      });
  };

  return (
    <div className="container">
      <div className="objects-container-field">
        <div className="add-object-field">
          <div className="add-object-item">
            <p>Добавить объект:</p>
            <input
              id="object_name"
              type="text"
              value={objectName}
              onChange={(e) => setObjectName(e.target.value)}
              placeholder="Имя объекта"
            />
          </div>
          <div className="add-object-item">
            <select
              id="object_type"
              value={objectType}
              onChange={(e) => setObjectType(e.target.value)}
            >
              <option value="">Выберите тип объекта</option>
              <option value="EMS">EMS</option>
              <option value="Network node">Network node</option>
              <option value="Data Element SNMP">Data Element SNMP</option>
            </select>
          </div>
          <div className="add-object-item">
            <textarea
              id="object_description"
              value={objectDescription}
              onChange={(e) => setObjectDescription(e.target.value)}
              placeholder="Описание объекта"
            />
          </div>
          <button onClick={handleAddObject} className="btn btn-primary btn-sm">
            Добавить
          </button>
        </div>
      </div>
      <div className="response-field">
        <h3>Ответ сервера</h3>
        <textarea value={serverResponse} readOnly={true} />
      </div>
    </div>
  );
};

export default AddObjects;
