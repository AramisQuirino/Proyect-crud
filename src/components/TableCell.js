import React from 'react';
import {Input} from 'reactstrap'


const TableCell = ({ value, isEditing, onChange}) => (
    <td>
      {
        isEditing 
        ? <Input onChange={(e) => { 
              e.preventDefault(); 
              onChange(e.target.value)
            }} 
            value={value}/>
        : <label>{value}</label>
      }
    </td>
)

export default TableCell;