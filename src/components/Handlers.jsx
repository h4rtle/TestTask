import { changeInformationByTableForInteractions } from "../api/requests";

export const handleCellClick = (
  cell,
  setSelectedCell,
  setShowField,
  setObjectData
) => {
  setSelectedCell(cell);
  setShowField(true);
  setObjectData(cell);
};

export const handleCellChange = async (
  selectedCell,
  objectData,
  tableCells,
  setTableCells,
  setShowField,
  setServerResponse
) => {
  if (!selectedCell) return;

  const updatedFields = [];

  if (objectData.object_name !== undefined) {
    updatedFields.push({
      operation_type: "update",
      data: {
        object_id: selectedCell.object_id,
        object_name: objectData.object_name,
      },
    });
  }

  if (objectData.object_type !== undefined) {
    updatedFields.push({
      operation_type: "update",
      data: {
        object_id: selectedCell.object_id,
        object_type: objectData.object_type,
      },
    });
  }

  if (objectData.object_description !== undefined) {
    updatedFields.push({
      operation_type: "update",
      data: {
        object_id: selectedCell.object_id,
        object_description: objectData.object_description,
      },
    });
  }

  try {
    for (const field of updatedFields) {
      const response = await changeInformationByTableForInteractions(field);

      if (response && response.operation === "update") {
        const newTableCells = tableCells.map((cell) =>
          cell.object_id === selectedCell.object_id
            ? { ...cell, ...field.data }
            : cell
        );

        setTableCells(newTableCells);
        setServerResponse(JSON.stringify(response, null, 2));
      } else {
        console.error(
          "Ошибка при изменении данных на сервере:",
          response ? response.errors : "Неизвестная ошибка"
        );
      }
    }
  } catch (error) {
    console.error("Ошибка при изменении данных:", error);
  }

  setShowField(false);
};

export const handleCellDelete = async (
  selectedCell,
  tableCells,
  setTableCells,
  setShowField,
  setServerResponse
) => {
  if (!selectedCell) return;

  const deleteData = {
    operation_type: "delete",
    data: { object_id: selectedCell.object_id },
  };

  try {
    const response = await changeInformationByTableForInteractions(deleteData);
    if (response && response.operation === "delete") {
      const updatedCells = tableCells.filter(
        (cell) => cell.object_id !== selectedCell.object_id
      );
      setTableCells(updatedCells);
      setServerResponse(JSON.stringify(response, null, 2));
    } else {
      console.error("Ошибка при удалении объекта на сервере");
    }
    setShowField(false);
  } catch (error) {
    console.error("Ошибка при удалении объекта:", error);
  }
};

export const handleAddObject = async (
  objectName,
  objectType,
  objectDescription,
  tableCells,
  setTableCells,
  setServerResponse
) => {
  if (!objectName || !objectType || !objectDescription) {
    setServerResponse("Все поля должны быть заполнены");
    return;
  }

  const newObject = {
    object_name: objectName,
    object_type: objectType,
    object_description: objectDescription,
  };

  const data = {
    operation_type: "insert",
    data: newObject,
  };

  try {
    const response = await changeInformationByTableForInteractions(data);
    if (response && response.operation === "insert") {
      const updatedCells = [...tableCells, response.object_instance];
      setTableCells(updatedCells);
      setServerResponse(JSON.stringify(response, null, 2));
    } else {
      console.error("Ошибка добавления объекта:", response);
      setServerResponse(`Ошибка: ${response}`);
    }
  } catch (error) {
    console.error("Ошибка добавления объекта:", error);
    setServerResponse(`Ошибка: ${error}`);
  }
};
