import React, { Component } from 'react';
import '../App.css'
import { Table } from 'reactstrap'
import { connect } from 'react-redux';
import { userActions } from '../actions/user.actions';
import { Button } from 'react-bootstrap';
//import { Redirect } from 'react-router-dom'
class Crud extends Component {
    constructor(props) {
        super(props)
        this.state = {rows: []};
    }

    componentDidMount() {
        const { getAll } = this.props;
      
        getAll();
    }

    updateRecibo = (recibo) => {      
        const { update } = this.props
        console.log("update" + recibo)

        update(recibo);
    }

    deleteRecibo = (recibo, e) => {
        const { _delete } = this.props;
        console.log("delete")

        _delete(recibo);
    }

    addRecibo = (recibo, e) => {
        const { add } = this.props;
        console.log("add")

        add(recibo);
    }

    appendRow(event) {
        var rel = event.target.getAttribute("rel");
        rel = parseInt(rel) + 1;
      
        const joined = this.state.rows.concat(
        <tr>
          <td>
            <input type="text" id={`select-type` + rel} />
          </td>
          <td>
            <input type="text" id={`select-position` + rel} />
          </td>
        </tr>
        );
        this.setState({ rows: joined })
      }

    renderList() {
        const { Recibo } = this.props;

        if(!Recibo) {
            return null;
        }

        return Recibo.map((recibo) => {
            return(
             <tr key={recibo.id}> 
                <td>{ recibo.reciboId }</td>
                <td contentEditable suppressContentEditableWarning>{ recibo.proveedor }</td>
                <td contentEditable suppressContentEditableWarning>{ recibo.monto }</td>
                <td contentEditable suppressContentEditableWarning>{ recibo.moneda }</td>
                <td contentEditable suppressContentEditableWarning>{ recibo.fecha }</td>
                <td contentEditable suppressContentEditableWarning>{ recibo.comentario }</td>
                <td><Button onClick={this.updateRecibo.bind(this) }>Actualizar</Button></td>
                <td><Button onClick={(e) => this.deleteRecibo(recibo, e) }>Borrar</Button></td>
            </tr>
        )})
    }

    render() {
        return (
            <div>
                <h2>Recibos</h2>
                <Button onClick={ this.appendRow }>Agregar</Button>
                <Table bordered>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Proveedor</th>
                            <th>Monto</th>
                            <th>Moneda</th>
                            <th>Fecha</th>
                            <th>Comentario</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                       {this.renderList()}
                       {this.state.rows}
                    </tbody>
                </Table>
                {/* {!loggedIn && <Redirect to="/login" />} */}
            </div>
        )
    }
}

// esto regresa un objeto, las propiedades de este objeto son las props (datos)
const mapStateToProps = ({ authentication, users }) => ({
    loggedIn: authentication.get('loggedIn'),
    Recibo: users.get('recibo').toJS(),
})

// esto regresa un objeto, las propiedades de este objeto son las acciones (funciones)
const mapDispatchToProps = dispatch => {
    return {
        getAll: () => dispatch(userActions.getAll()),
        update: (Recibo) => dispatch(userActions.update(Recibo)),
        _delete: (Recibo) => dispatch(userActions._delete(Recibo)),
        add: (Recibo) => dispatch(userActions.add(Recibo)),
    } 
} 

export default connect(mapStateToProps,mapDispatchToProps)(Crud)
