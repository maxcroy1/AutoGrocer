import React from 'react';
import Navbar from '../components/Navbar';

class Registration extends React.Component {

    state = {
        fname: "",
        lname: "",
        email: "",
        username: "",
        password: "",
        password_conf: ""
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <Navbar />
                <h1>Sign Up</h1>
                <form onSubmit={this.handleSubmit}>
                    <label for="fname">First Name:</label><br />
                    <input type="text" id="fname" name="fname" onChange={this.handleChange} /><br />
                    <label for="lname">Last Name:</label><br />
                    <input type="text" id="lname" name="lname" onChange={this.handleChange} /><br />
                    <label for="email">Email:</label><br />
                    <input type="text" id="email" name="email" onChange={this.handleChange} /><br />
                    <label for="username">Username:</label><br />
                    <input type="text" id="reg_username" name="username" onChange={this.handleChange} /><br />
                    <label for="password">Password:</label><br />
                    <input type="password" id="reg_password" name="password" onChange={this.handleChange} /><br />
                    <label for="password_conf">Confirm Password:</label><br />
                    <input type="password" id="password_conf" name="password_conf" onChange={this.handleChange} /><br />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default Registration;