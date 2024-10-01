import React, { useState } from "react";
import TableForInteractions from "./components/TableForInteractions";
import AddObjects from "./components/AddObjects";
import { handleNewObject } from "./components/Handlers";

const InteractionsPage = () => {
  const [tableCells, setTableCells] = useState([]);
  const [serverResponse, setServerResponse] = useState("");

  return (
    <>
      <TableForInteractions
        cells={tableCells}
        setCells={setTableCells}
        setServerResponse={setServerResponse}
      />
      <AddObjects
        handleNewObject={handleNewObject}
        tableCells={tableCells}
        setTableCells={setTableCells}
        setServerResponse={setServerResponse}
        serverResponse={serverResponse}
      />
    </>
  );
};

export default InteractionsPage;
