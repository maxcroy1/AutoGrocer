import React from 'react';
import { connect } from 'react-redux';
import { fetchUserData } from '../actions/auth';
import { completeRegistration } from '../actions/registration';
import { Container, Form, Button } from 'react-bootstrap';

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
                this.props.fetchUserData()
                this.props.completeRegistration()
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
            <Container className="py-4">
                <h1>Login</h1>
                <Form onSubmit={ this.handleSubmit }>
                    <Form.Group>
                        <Form.Label htmlFor="username">Username:</Form.Label>
                        <Form.Control type="text" id="username" name="username" onChange={ this.handleChange }></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="password">Password:</Form.Label>
                        <Form.Control type="password" id="password" name="password" onChange={ this.handleChange }></Form.Control>
                    </Form.Group>
                    <br />
                    <Button variant="success" type="submit" value="Log in">Log In</Button>
                </Form>
            </Container>
        )
    }
}

const mapDispactchToProps = dispatch => {
    return {
        fetchUserData: () => {
            dispatch(fetchUserData())
        },
        completeRegistration: () => {
            dispatch(completeRegistration())
        }
    }
}

export default connect(null, mapDispactchToProps)(Login);