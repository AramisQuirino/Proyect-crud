import React, {Component} from 'react'
import {connect} from 'react-redux'
import { userActions } from '../actions/user.actions'
import { Table } from 'react-bootstrap'

class Crud extends Component{
    constructor(props) {
        super(props);

        const {getAll} = this.props
        getAll()
 
        this.state = {
            list: []
        };
    }

    renderList() {
        return this.props.getAll((r) => {
            return (
                <tr key={r.ReciboId}>
                    <td>{r.ReciboId}</td>
                    <td>{r.Proveedor}</td>
                    <td>{r.Monto}</td>
                    <td>{r.Moneda}</td>
                    <td>{r.Fecha}</td>
                    <td>{r.Comentario}</td>
                </tr>
            )
        })
    }

    render(){
        return(
            <div>
                <h2>Recibos</h2>
                <Table responsive>
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
                    { this.renderList() }
                </Table>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        list: state.list
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getAll: () => dispatch(userActions.getAll()),
    }
} 

export default connect(mapStateToProps,mapDispatchToProps)(Crud)