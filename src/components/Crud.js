import React, {Component} from 'react'
import {connect} from 'react-redux'
import { userActions } from '../actions/user.actions'
import { Table } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';

class Crud extends Component{
    constructor(props) {
        super(props);
 
        this.state = {
            list: []
        };
    }

    renderList() {
        // return this.props.getAll((r) => {
        //     return (
        //         <tr key={r.ReciboId}>
        //             <td>{r.ReciboId}</td>
        //             <td>{r.Proveedor}</td>
        //             <td>{r.Monto}</td>
        //             <td>{r.Moneda}</td>
        //             <td>{r.Fecha}</td>
        //             <td>{r.Comentario}</td>
        //         </tr>
        //     )
        // })
    }

    render(){
        const { loggedIn } = this.props;

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
            {!loggedIn && <Redirect to="/login" />}
            </div>
        )
    }

}

const mapStateToProps = ({ authentication }) => ({
    loggedIn: authentication.get('loggedIn'),
})

const mapDispatchToProps = dispatch => {
    return {
        getAll: () => dispatch(userActions.getAll()),
    }
} 

export default connect(mapStateToProps,mapDispatchToProps)(Crud)