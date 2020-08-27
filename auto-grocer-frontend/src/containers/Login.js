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
        // INSERT FETCH TO SEARCH FOR USER AND ISSUE JWT TOKEN
    }

    render() {
        return (
            <div>
                <Navbar />
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <label for="username">Username:</label><br />
                    <input type="text" id="username" name="username" onChange={this.handleChange}></input><br />
                    <label for="password">Password:</label><br />
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