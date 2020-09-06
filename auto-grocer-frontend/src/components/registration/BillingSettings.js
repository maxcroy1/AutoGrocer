import React from 'react';
import { connect } from 'react-redux';
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
                <p>Next, we need your Instacart login credentials, as well as some billing information. AutoGrocer will always default to using the payment method you have on file with Instacart, but this card will be used if your account doesn't have default billing preferences saved.</p>
                <form onSubmit={this.handleSubmit}>
                    <h2>Instacart Credentials</h2>
                    <label htmlFor="instacart_email">Email Address:</label><br />
                    <input type="text" name="instacart_email" onChange={this.handleChange} /><br />

                    <label htmlFor="instacart_email_conf">Confirm Email Address:</label><br />
                    <input type="text" name="instacart_email_conf" onChange={this.handleChange} /><br />

                    <label htmlFor="instacart_pass">Password:</label><br />
                    <input type="password" name="instacart_pass" onChange={this.handleChange} /><br />

                    <label htmlFor="instacart_pass_conf">Confirm Password:</label><br />
                    <input type="password" name="instacart_pass_conf" onChange={this.handleChange} /><br />

                    <h2>Billing Information</h2>
                    <label htmlFor="card_num">Credit Card Number:</label><br />
                    <input type="text" name="card_num" onChange={this.handleChange} /><br />

                    <label htmlFor="expiration">Expiration Month (MM):</label><br />
                    <input type="text" name="exp_month" onChange={this.handleChange} /><br />

                    <label htmlFor="expiration">Expiration Year (YY):</label><br />
                    <input type="text" name="exp_year" onChange={this.handleChange} /><br />

                    <label htmlFor="cvc">CVC:</label><br />
                    <input type="text" name="cvc" onChange={this.handleChange} /><br />

                    <label htmlFor="street_address">Street Address:</label><br />
                    <input type="text" name="street_address" onChange={this.handleChange} /><br />

                    <label htmlFor="city">City:</label><br />
                    <input type="text" name="city" onChange={this.handleChange} /><br />

                    <label htmlFor="state">State:</label><br />
                    <input type="text" name="state" onChange={this.handleChange} /><br />

                    <label htmlFor="zipcode">ZIP Code:</label><br />
                    <input type="text" name="zipcode" onChange={this.handleChange} /><br />

                    <input type="submit" value="Complete Registration" />
                </form>
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