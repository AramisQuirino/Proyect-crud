import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../actions/user.actions';
 
class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
 
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
 
    handleSubmit(event) {
        event.preventDefault();
 
        this.setState({ submitted: true });
        const { usuario, password } = this.state;
        const { register } = this.props;
        if (usuario && password) {
            register(usuario, password);
        }
    }
 
    render() {
        const { registering  } = this.props;
        const { usuario,password, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Register</h2>
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
                        <button className="btn btn-primary">Register</button>
                        {registering}
                        <Link to="/login" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}
 
function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

const mapDispatchToProps = dispatch => {
    return {
        register: (usuario, password) => dispatch(userActions.register(usuario, password)),
    }
} 

export default connect(mapStateToProps,mapDispatchToProps)(RegisterPage)