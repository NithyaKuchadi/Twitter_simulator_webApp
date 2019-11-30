import React, { Component } from 'react';
import { login } from '../redux/actions/signup_login_actions';
import { connect } from 'react-redux';
import './css/login.css';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            EmptyCredentials: "",
            IncorrectCredentials: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = (e) => {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }
    onLogin = async (e) => {
        e.preventDefault();
        let post = {
                username: this.state.username,
                password: this.state.password,
            }
            await this.props.login(post);
            if (this.props.loginSuccess) {
                window.location.replace('/Dashboard');
            } else {
                this.setState(
                    {
                        IncorrectCredentials: "Incorrect Credentials"
                    }
                )
            }
        
    }
    render() {
        return (
            <div >
                <nav className="navbar">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="/TwitterHome">Home</a>
                            <span className="twitter"></span>
                        </div>
                    </div>
                </nav>
                <div className="login">
                    <p className="field1234">Log in to Twitter</p>
                   
                    <div className="field1234567890" style={{ color: "red" }}>{this.state.IncorrectCredentials}</div><br/>
                    <form onSubmit={this.onLogin} method="post" autoComplete="off">
                        <div className="form-group">
                            <input className="field12" onChange={this.handleChange} type="text" name="username" placeholder="User Name" required />
                            <br />
                            <br />
                            <input className="field12" onChange={this.handleChange} type="password" name="password" placeholder="Password" required />
                        </div>
                        <br></br>
                        <div className="but">
                            <input type="submit" className="loginbutton2" style={{ width: "25%" }} value="Log in" />

                        </div>
                        <br></br>
                        <label className="field123">New to Twitter?</label> <label> <a className="bg-default" href="/Signup">Sign up now</a></label>
                        <br></br>
                        <br></br>
                    </form>
                </div>

                <br></br>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loginSuccess: state.signin.loginSuccess
 };
}

export default connect(
    mapStateToProps,
    { login }
)(Login);