import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions/user.actions';
 
class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
 
        this.state = {
            user: {
                usuario: '',
                password: ''
            },
            submitted: false
        };
 
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
 
    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }
 
    handleSubmit(event) {
        event.preventDefault();
 
        this.setState({ submitted: true });
        const { user } = this.state;
        const { register } = this.props;
        if (user.usuario && user.password) {
            register(user.usuario, user.password);
        }
    }
 
    render() {
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Register</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !user.usuario ? ' has-error' : '')}>
                        <label htmlFor="usuario">Usuario</label>
                        <input type="text" className="form-control" name="usuario" value={user.usuario} onChange={this.handleChange} />
                        {submitted && !user.usuario &&
                            <div className="help-block">Usuario is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                        {submitted && !user.password &&
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