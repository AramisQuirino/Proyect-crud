import React, {Component} from 'react'
import '../App.css'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

export default class Log extends Component {

    constructor(props) {
        super(props);
 
        // reset login status
        //this.props.dispatch(userActions.logout());
 
        this.state = {
            usuario: '',
            password: '',
            submitted: false
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
        const { dispatch } = this.props;
        if (usuario && password) {
            dispatch(userActions.login(usuario, password));
        }
    }

    render(){
        const { loggingIn } = this.props;
        const { usuario, password, submitted } = this.state;
        return(
            <div className="col-md-6 col-md-offset-3">
                <h2>Login</h2>
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
                        {loggingIn}
                        <Link to="/register" className="btn btn-link">Register</Link>
                    </div>
                </form>
            </div>
        )
    }

}

 
function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}
 
const connectedLoginPage = connect(mapStateToProps)(Log);
export { connectedLoginPage as Log };