import { changeInformationByTableForInteractions } from "../../../api/requests";

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

export const handleCloseField = (setShowField) => {
  setShowField(false);
};

export const handleCellDelete = (
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

  changeInformationByTableForInteractions(deleteData)
    .then((response) => {
      if (response && response.operation === "delete") {
        const updatedCells = tableCells
          .filter((cell) => cell.object_id !== selectedCell.object_id)
          .map((cell, index) => ({ ...cell, object_id: index + 1 }));
        setTableCells(updatedCells);
        setShowField(false);
        const formattedResponse = {
          operation: "delete",
          object_id: selectedCell.object_id,
          object_instance: selectedCell,
          timestamp: new Date().toISOString(),
          errors: "",
        }; // приводит ответ сервера в нужный формат
        setServerResponse(JSON.stringify(formattedResponse, null, 2));
      } else {
        console.error("Ошибка удаления объекта:", response);
        setServerResponse(`Ошибка: ${response}`);
      }
    })
    .catch((error) => {
      console.error("Ошибка удаления объекта:", error);
      setServerResponse(`Ошибка: ${error}`);
    });
};

export const handleCellChange = (
  selectedCell,
  objectData,
  tableCells,
  setTableCells,
  setShowField,
  setServerResponse
) => {
  if (!selectedCell) return;

  const updateData = {
    operation_type: "update",
    data: {
      object_id: selectedCell.object_id,
      object_name: objectData.object_name,
      object_type: objectData.object_type,
      object_description: objectData.object_description,
    },
  };

  changeInformationByTableForInteractions(updateData)
    .then((response) => {
      if (response && response.operation === "update") {
        const updatedCells = tableCells.map((cell) => {
          if (cell.object_id === selectedCell.object_id) {
            return {
              ...cell,
              object_name: objectData.object_name,
              object_type: objectData.object_type,
              object_description: objectData.object_description,
            };
          }
          return cell;
        });
        setTableCells(updatedCells);
        setShowField(false);
        const formattedResponse = {
          operation: "update",
          updated_param: "object_name",
          errors: "",
        };
        setServerResponse(JSON.stringify(formattedResponse, null, 2));
      } else {
        console.error("Ошибка изменения объекта:", response);
        setServerResponse(`Ошибка: ${response}`);
      }
    })
    .catch((error) => {
      console.error("Ошибка изменения объекта:", error);
      setServerResponse(`Ошибка: ${error}`);
    });
};

export const handleNewObject = (
  newObject,
  tableCells,
  setTableCells,
  setServerResponse
) => {
  const updatedCells = [...tableCells, newObject].map((cell, index) => ({
    ...cell,
    object_id: index + 1,
  }));
  setTableCells(updatedCells);
  const formattedResponse = {
    operation: "insert",
    object_id: updatedCells.length,
    object_instance: newObject,
    timestamp: new Date().toISOString(),
    errors: "",
  };
  setServerResponse(JSON.stringify(formattedResponse, null, 2));
};
