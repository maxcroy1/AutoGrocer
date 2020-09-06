import React from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/auth';
import { Button, Form } from 'react-bootstrap';

class AccountSettings extends React.Component {
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
        if (this.state.password === this.state.password_conf) {
            let configObj = this.buildFetchConfig();
            fetch('http://localhost:3000/users', configObj)
                .then(resp => resp.json())
                .then(json => {
                    localStorage.setItem("ag_token", json.jwt)
                    this.props.registerUser(localStorage.getItem("ag_token"))
                })
                .catch(error => console.log(error))
        }
    }

    buildFetchConfig() {
        let formData = {
            user: {
                fname: this.state.fname,
                lname: this.state.lname,
                email: this.state.email,
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
            <div className="py-2">
                <p>First, we need to set up your AutoGrocer account so you can login periodically to change your settings.</p>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label htmlFor="fname">First Name:</Form.Label><br />
                        <Form.Control type="text" name="fname" onChange={this.handleChange} /><br />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="lname">Last Name:</Form.Label><br />
                        <Form.Control type="text" name="lname" onChange={this.handleChange} /><br />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="email">Email Address:</Form.Label><br />
                        <Form.Control type="text" name="email" onChange={this.handleChange} /><br />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="username">Username:</Form.Label><br />
                        <Form.Control type="text" name="username" onChange={this.handleChange} /><br />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="password">Password:</Form.Label><br />
                        <Form.Control type="password" name="password" onChange={this.handleChange} /><br />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="password_conf">Confirm Password:</Form.Label><br />
                        <Form.Control type="password" name="password_conf" onChange={this.handleChange} /><br />
                    </Form.Group>

                    <Button variant="success" type="submit">
                        Next: Billing Info
                    </Button>
                </Form>
            </div>
        );
    }
}

const mapDispactchToProps = dispatch => {
    return {
        registerUser: (token) => {
            dispatch(registerUser(token))
        }
    }
}

export default connect(null, mapDispactchToProps)(AccountSettings);