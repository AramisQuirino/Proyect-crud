import React, { Component } from 'react';
import '../App.css'
import { Table, Input, Label, Row, Col } from 'reactstrap'
import { connect } from 'react-redux';
import { userActions } from '../actions/user.actions';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import TableRow from './TableRow';

class Crud extends Component {
    constructor(props) {
        super(props)
        this.state = {
                    ReciboId: '',
                    Proveedor: '',
                    Monto: '',
                    Moneda: '',
                    Fecha: this.getCurrentDate(),
                    Comentario: ''
                }    

        this.handleChange = this.handleChange.bind(this);
        this.addRecibo = this.addRecibo.bind(this);
    }

    getCurrentDate(separator=''){
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        
        return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
    }

    handleChange(key, value){
        this.setState({ [key]: value });
    }
    
    componentDidMount() {
        const { getAll } = this.props;
      
        getAll();
    }

    updateRecibo = (Recibo) => {
        const { update } = this.props

        update(Recibo);
    }
  
    deleteRecibo = (Recibo) => {
        const { _delete } = this.props;

        _delete(Recibo);
    }

    addRecibo () {
        const { add } = this.props;
        const {  
            Proveedor,
            Monto,
            Moneda,
            Fecha,
            Comentario
        } = this.state;

        add({ 
            Proveedor,
            Monto,
            Moneda,
            Fecha,
            Comentario
        })

        window.location.reload(true)
    }

    renderList() {
        const { Recibo } = this.props;

        if(!Recibo) {
            return null;
        }

        return Recibo.map((recibo, index) => {
            return(
                <TableRow 
                    recibo={recibo}
                    index={index} 
                    onUpdate={this.updateRecibo} 
                    onDelete={this.deleteRecibo}
                />
            )
        })
    }

    render () {
        const {  
            Proveedor,
            Monto,
            Moneda,
            Fecha,
            Comentario
        } = this.state;

        return (
            <div>
                <div>
                    <Link to="/login" className="btn btn-link">Logout</Link>
                </div>
                <br/>
                <div className="col-md-12 col-md-offset-2">
                    <form name="form" >
                        <h2>Agregar Recibos</h2>
                        <Row form>
                            <Col md={3}>
                                <Label  className="col-md-12">Proveedor</Label>
                                <Input 
                                    type="text" 
                                    placeholder="Proveedor" 
                                    className="col-md-12"
                                    onChange={(e) => this.handleChange('Proveedor', e.target.value)}
                                    value={Proveedor}
                                />
                            </Col>
                            <Col md={3}>
                                <Label  className="col-md-12">Monto</Label>
                                <Input 
                                    type="number" 
                                    placeholder="Monto" 
                                    className="col-md-12"
                                    onChange={(e) => this.handleChange('Monto', e.target.value)}
                                    value={Monto}
                                />
                            </Col>
                            <Col md={3}>
                                <Label  className="col-md-12">Moneda</Label>
                                <Input 
                                    type="text" 
                                    placeholder="Moneda" 
                                    className="col-md-12"
                                    onChange={(e) => this.handleChange('Moneda', e.target.value)}
                                    value={Moneda}
                                />
                            </Col>
                            <Col md={3}>
                                <Label  className="col-md-12">Fecha</Label>
                                <Input 
                                    type="date"
                                    placeholder="Fecha"
                                    className="col-md-12"
                                    onChange={(e) => this.handleChange('Fecha', e.target.value)}
                                    value={Fecha}
                                />
                            </Col>
                            <Col md={12}>
                                <Label  className="col-md-12">Comentario</Label>
                                <Input 
                                    type="textarea" 
                                    name="comentario" 
                                    id="comentario"
                                    onChange={(e) => this.handleChange('Comentario', e.target.value)}
                                    value={Comentario}
                                />
                            </Col>
                        </Row>
                    </form>
                </div>
                <br/>
                <div className="form-group">
                    <Button onClick={this.addRecibo}>Guardar</Button>
                </div>
                <br/>
                <br/>
                <div>
                    <h2>Recibos</h2>
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
                        </tbody>
                    </Table>
                </div>
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
