import React, { useState } from "react";
import TableForInteractions from "../../components/TableForInteractions";
import AddObjects from "../../components/AddObjects";

const InteractionsPage = () => {
  const [tableCells, setTableCells] = useState([]);
  const [serverResponse, setServerResponse] = useState("");

  return (
    <>
      <TableForInteractions
        setCells={setTableCells}
        setServerResponse={setServerResponse}
      />
      <div className="container">
        <AddObjects
          tableCells={tableCells}
          setTableCells={setTableCells}
          setServerResponse={setServerResponse}
          serverResponse={serverResponse}
        />
        <div className="response-field">
          <h3>Ответ сервера:</h3>
          <textarea
            value={serverResponse}
            readOnly={true}
            rows="10"
            cols="50"
          />
        </div>
      </div>
    </>
  );
};

export default InteractionsPage;
