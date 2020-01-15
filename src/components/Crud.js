import React, { Component } from 'react';
import '../App.css'
import { Table } from 'reactstrap'
import { connect } from 'react-redux';
import { userActions } from '../actions/user.actions';


class Crud extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            Recibo: {
                ReciboId: '',
                Proveedor: '',
                Monto: '',
                Moneda: '',
                Fecha: '',
                Comentario: ''
            }
        };
    }

    componentWillMount() {
        const { getAll } = this.props
        getAll()
    }

    render() {
        const { Recibo } = this.state
        return (
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Proveedor</th>
                        <th>Monto</th>
                        <th>Moneda</th>
                        <th>Fecha</th>
                        <th>Comentario</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{ Recibo.ReciboId }</td>
                        <td>{ Recibo.Proveedor }</td>
                        <td>{ Recibo.Monto }</td>
                        <td>{ Recibo.Moneda }</td>
                        <td>{ Recibo.Fecha }</td>
                        <td>{ Recibo.Comentario }</td>
                    </tr>
                </tbody>
            </Table>
        )
    }
}

function mapStateToProps(state) {
    return {
        Recibo: state.Recibo
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getAll: () => dispatch(userActions.getAll())
    }
} 

export default connect(mapStateToProps,mapDispatchToProps)(Crud)
