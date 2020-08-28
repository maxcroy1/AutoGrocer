import React from 'react';
import { connect } from 'react-redux';
import { logIn } from '../actions/auth'
import Navbar from '../components/Navbar';

class Login extends React.Component {

    state = {
        username: "",
        password: ""
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let configObj = this.buildConfigObj();
        fetch('http://localhost:3000/login', configObj)
            .then(resp => resp.json())
            .then(json => {
                localStorage.setItem("ag_token", json.jwt)
                this.props.logIn(json.jwt)
            })
            .catch(error => console.log(error))
    }

    buildConfigObj() {
        let formData = {
            user: {
                username: this.state.username,
                password: this.state.password
            }
        }
        let configObj = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        }
        return configObj
    }

    render() {
        return (
            <div>
                <Navbar />
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="username">Username:</label><br />
                    <input type="text" id="username" name="username" onChange={this.handleChange}></input><br />
                    <label htmlFor="password">Password:</label><br />
                    <input type="password" id="password" name="password" onChange={this.handleChange}></input><br />
                    <input type="submit" value="Log in" />
                </form>
            </div>
        )
    }
}

const mapDispactchToProps = dispatch => {
    return {
        logIn: (token) => {
            dispatch(logIn(token))
        }
    }
}

export default connect(null, mapDispactchToProps)(Login);