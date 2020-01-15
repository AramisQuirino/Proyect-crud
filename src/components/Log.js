import React, {Component} from 'react'
import '../App.css'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../actions/user.actions';
import { Alert } from 'react-bootstrap';

class Log extends Component {

    constructor(props) {
        super(props);

        const {logout} = this.props
        logout()
 
        this.state = {
            usuario: '',
            password: '',
            submitted: false,
            message: ''
        };
 
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
 
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
 
    handleSubmit(e) {
        e.preventDefault();
 
        this.setState({ submitted: true });
        const { usuario, password } = this.state;
        const { login } = this.props;
        if (usuario && password) {
            login(usuario,password)
            this.setState({ redirect:true })
        }
    }

    render(){
        const { loggedIn } = this.props;
        const { usuario, password, submitted } = this.state;

        return(
            <div className="col-md-6 col-md-offset-3">
                <h2>Login</h2>
                {
                    this.state.message !== ''? (
                        <Alert color="danger"></Alert>
                    ) : ''
                }
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !usuario ? ' has-error' : '')}>
                        <label htmlFor="usuario">Usuario</label>
                        <input type="text" className="form-control" name="usuario" value={usuario} onChange={this.handleChange} />
                        {submitted && !usuario &&
                            <div className="help-block">Usuario is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Login</button>
                        <Link to="/register" className="btn btn-link">Register</Link>
                    </div>authetication
                </form>
                {loggedIn && <Redirect to="/crud"></Redirect>}
            </div>
        )
    }

}

 
const mapStateToProps = ({authentication}) => ({
    loggedIn: authentication.get('loggedIn')
})

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(userActions.logout()),
        login: (usuario, password) => dispatch(userActions.login(usuario, password))
    }
} 

export default connect(mapStateToProps,mapDispatchToProps)(Log)