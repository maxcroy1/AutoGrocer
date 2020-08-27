import React from 'react';

class BillingSettings extends React.Component {
    state = {
        instacart_email: "",
        instacart_email_conf: "",
        instacart_pass: "",
        instacart_pass_conf: "",
        card_num: "",
        expiration: "",
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
        // INSERT FETCH TO CREATE USER, ISSUE JWT TOKEN, AND MOVE TO NEXT STAGE OF REGISTRATION
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h2>Instacart Credentials</h2>
                <label htmlFor="instacart_email">Email Address:</label><br />
                <input type="text" name="instacart_email" onChange={this.handleChange} /><br />

                <label htmlFor="instacart_email_conf">Confirm Email Address:</label><br />
                <input type="text" name="instacart_email" onChange={this.handleChange} /><br />

                <label htmlFor="instacart_pass">Password:</label><br />
                <input type="text" name="instacart_pass" onChange={this.handleChange} /><br />

                <label htmlFor="instacart_pass_conf">Confirm Password:</label><br />
                <input type="text" name="instacart_pass_conf" onChange={this.handleChange} /><br />

                <h2>Billing Information</h2>
                <label htmlFor="card_num">Credit Card Number:</label><br />
                <input type="text" name="card_num" onChange={this.handleChange} /><br />

                <label htmlFor="expiration">Expiration:</label><br />
                <input type="text" name="expiration" onChange={this.handleChange} /><br />

                <label htmlFor="cvc">CVC:</label><br />
                <input type="text" name="cvc" onChange={this.handleChange} /><br />

                <label htmlFor="street_address">Street Address:</label><br />
                <input type="text" name="street_address" onChange={this.handleChange} /><br />

                <label htmlFor="city">City:</label><br />
                <input type="text" name="city" onChange={this.handleChange} /><br />

                <label htmlFor="state">State:</label><br />
                <input type="text" name="state" onChange={this.handleChange} /><br />

                <label htmlFor="zipcode">Email address:</label><br />
                <input type="text" name="zipcode" onChange={this.handleChange} /><br />

                <input type="submit" value="Complete Registration" />
            </form>
        );
    }
}

export default BillingSettings;