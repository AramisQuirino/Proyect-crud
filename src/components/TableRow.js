import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import TableCell from './TableCell';

const TableRow = ({ onUpdate, onDelete, recibo, index }) => {
  const { id, reciboId } = recibo;

  const [isEditing, setIsEditing] = useState(false);
  const [proveedor, setProveedor] = useState(recibo.proveedor);
  const [monto, setMonto] = useState(recibo.monto);
  const [moneda, setMoneda] = useState(recibo.moneda);
  const [fecha, setFecha] = useState(recibo.fecha);
  const [comentario, setComentario] = useState(recibo.comentario);

  const update = () => {
    setIsEditing(false);
    onUpdate({ id, reciboId, proveedor, monto, moneda, fecha, comentario });
  }

  const _delete = () => {
    setIsEditing(false);
    onDelete({ id, reciboId, proveedor, monto, moneda, fecha, comentario });
  }

  return(
    <tr key={id} onClick={() => setIsEditing(true)}> 
      <td>{ index }</td>
      <TableCell value={proveedor} onChange={(value) => setProveedor(value)} isEditing={isEditing}/>
      <TableCell value={monto} onChange={(value) => setMonto(value)} isEditing={isEditing}/>
      <TableCell value={moneda} onChange={(value) => setMoneda(value)} isEditing={isEditing}/>
      <TableCell value={fecha} onChange={(value) => setFecha(value)} isEditing={isEditing}/>
      <TableCell value={comentario} onChange={(value) => setComentario(value)} isEditing={isEditing}/>
      <td><Button onClick={update}>Actualizar</Button></td>
      <td><Button onClick={_delete}>Borrar</Button></td>
   </tr>
)
}

export default TableRow;