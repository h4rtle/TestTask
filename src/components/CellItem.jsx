import React from "react";

const CellItem = ({ cell }) => {
  return (
    <tr>
      <td>{cell.date}</td>
      <td>{cell.time}</td>
      <td>{cell.event}</td>
    </tr>
  );
};

export default CellItem;
