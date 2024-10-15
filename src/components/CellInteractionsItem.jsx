import React from "react";

const CellInteractionsItem = ({ cell, onClick }) => {
  return (
    <tr onClick={onClick} className="cell-interactions-item">
      <td>{cell.object_id}</td>
      <td>{cell.object_name}</td>
      <td>{cell.object_type}</td>
      <td>{cell.object_description}</td>
    </tr>
  );
};

export default CellInteractionsItem;
