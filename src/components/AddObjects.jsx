import React, { useState } from "react";
import { handleAddObject as addObjectHandler } from "./Handlers";

const AddObjects = ({ tableCells, setTableCells, setServerResponse }) => {
  const [objectName, setObjectName] = useState("");
  const [objectType, setObjectType] = useState("");
  const [objectDescription, setObjectDescription] = useState("");

  const handleAddObject = async () => {
    await addObjectHandler(
      objectName,
      objectType,
      objectDescription,
      tableCells,
      setTableCells,
      setServerResponse
    );

    setObjectName("");
    setObjectType("");
    setObjectDescription("");
  };

  return (
    <div className="add-objects-field">
      <div className="add-objects-item">
        <p>Добавить объект:</p>
        <input
          type="text"
          value={objectName}
          onChange={(e) => setObjectName(e.target.value)}
          placeholder="Имя объекта"
        />
      </div>
      <div className="add-objects-item">
        <select
          value={objectType}
          onChange={(e) => setObjectType(e.target.value)}
        >
          <option value="">Выберите тип объекта</option>
          <option value="EMS">EMS</option>
          <option value="Network node">Network node</option>
          <option value="Data Element SNMP"> Data Element SNMP</option>
        </select>
      </div>
      <div className="add-objects-item">
        <textarea
          value={objectDescription}
          onChange={(e) => setObjectDescription(e.target.value)}
          placeholder="Описание объекта"
        />
      </div>
      <button
        onClick={handleAddObject}
        className="add-objects-button btn btn-primary btn-sm"
      >
        Добавить
      </button>
    </div>
  );
};

export default AddObjects;
