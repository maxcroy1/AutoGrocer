import React from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { completeRegistration } from '../../actions/registration';

class BillingSettings extends React.Component {
    state = {
        instacart_email: "",
        instacart_email_conf: "",
        instacart_pass: "",
        instacart_pass_conf: "",
        card_num: "",
        exp_month: "",
        exp_year: "",
        cvc: "",
        street_address: "",
        city: "",
        state: "",
        zipcode: ""
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if ((this.state.instacart_email === this.state.instacart_email_conf) && (this.state.instacart_pass === this.state.instacart_pass_conf)) {
            let configObj = this.buildFetchConfig();
            fetch('http://localhost:3000/billing_settings', configObj)
                .then(this.props.completeRegistration())
                .catch(error => console.log(error))
        } else {
            console.log('Nope') // Change this
        }
    }

    buildFetchConfig() {
        let formData = {
            instacart_email: this.state.instacart_email,
            instacart_pass: this.state.instacart_pass,
            card_num: this.state.card_num,
            exp_month: this.state.exp_month,
            exp_year: this.state.exp_year,
            cvc: this.state.cvc,
            street_address: this.state.street_address,
            city: this.state.city,
            state: this.state.state,
            zipcode: this.state.zipcode
        }
        let configObj = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${this.props.user}` 
            },
            body: JSON.stringify(formData)
        }
        return configObj
    }

    render() {
        return (
            <div>
                <p>Next, we need your Instacart login credentials, as well as some billing information.</p>
                <p>AutoGrocer will always default to using the payment method you have on file with Instacart, but this card will be used if your account doesn't have default billing preferences saved.</p>
                <Form onSubmit={this.handleSubmit}>
                    <h3>Instacart Credentials</h3>
                    <Form.Group>
                        <Form.Label htmlFor="instacart_email">Email Address:</Form.Label><br />
                        <Form.Control type="text" name="instacart_email" onChange={this.handleChange} /><br />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="instacart_email_conf">Confirm Email Address:</Form.Label><br />
                        <Form.Control type="text" name="instacart_email_conf" onChange={this.handleChange} /><br />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="instacart_pass">Password:</Form.Label><br />
                        <Form.Control type="password" name="instacart_pass" onChange={this.handleChange} /><br />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="instacart_pass_conf">Confirm Password:</Form.Label><br />
                        <Form.Control type="password" name="instacart_pass_conf" onChange={this.handleChange} /><br />
                    </Form.Group>
                    <h3>Billing Information</h3>
                    <Form.Group>
                        <Form.Label htmlFor="card_num">Credit Card Number:</Form.Label><br />
                        <Form.Control type="text" name="card_num" onChange={this.handleChange} /><br />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="expiration">Expiration Month (MM):</Form.Label><br />
                        <Form.Control type="text" name="exp_month" onChange={this.handleChange} /><br />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="expiration">Expiration Year (YY):</Form.Label><br />
                        <Form.Control type="text" name="exp_year" onChange={this.handleChange} /><br />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="cvc">CVC:</Form.Label><br />
                        <Form.Control type="text" name="cvc" onChange={this.handleChange} /><br />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="street_address">Street Address:</Form.Label><br />
                        <Form.Control type="text" name="street_address" onChange={this.handleChange} /><br />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="city">City:</Form.Label><br />
                        <Form.Control type="text" name="city" onChange={this.handleChange} /><br />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="state">State:</Form.Label><br />
                        <Form.Control type="text" name="state" onChange={this.handleChange} /><br />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="zipcode">ZIP Code:</Form.Label><br />
                        <Form.Control type="text" name="zipcode" onChange={this.handleChange} /><br />
                    </Form.Group>

                    <Button type="submit" variant='success'>
                        Complete Registration
                    </Button>
                </Form>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return { user: state.user.token };
};

const mapDispactchToProps = dispatch => {
    return {
        completeRegistration: () => {
            dispatch(completeRegistration())
        }
    }
}

export default connect(mapStateToProps, mapDispactchToProps)(BillingSettings);