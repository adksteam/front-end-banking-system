import React from 'react';

const TableRow = (props) => {
  return <tr>
        <td style={props.style}>{props.fieldName}</td>
        <td style={props.style} className={props.className}>{props.field}</td>
      </tr>
}

export default TableRow;
