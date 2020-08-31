import React from 'react';
import { connect } from 'react-redux';

class DeliveryPreferences extends React.Component {
    state = {
        address_one: "",
        address_two: "",
        zipcode: "",
        instructions: "",
        delivery_time: "",
        mobile_num: ""
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(this.state)
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let configObj = this.buildConfigObj();
        fetch(`http://localhost:3000/orders/${this.props.order_id}`, configObj)
            .then(resp => resp.json())
            .then(json => console.log(json))
            .catch(error => console.log(error))
    }

    buildConfigObj = () => {
        let formData = {
            delivery_address_one: this.state.address_one,
            delivery_address_two: this.state.address_two,
            zipcode: this.state.zipcode,
            instructions: this.state.instructions,
            time: this.state.delivery_time,
            mobile_num: this.state.mobile_num
        }
        console.log(formData.time)
        let configObj = {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${this.props.user}`
            },
            body: JSON.stringify(formData)
        }
        return configObj;
    }

    render() {
        return (
            <div>
                    <form onSubmit={this.handleSubmit} >
                        <h2>Where would you like your food to be delivered?</h2>
                        <label htmlFor="address_one">Address Line 1:</label> <br />
                        <input type="text" name="address_one" onChange={this.handleChange} /> <br />
                        <label htmlFor="address_two">Address Line 2:</label> <br />
                        <input type="text" name="address_two" onChange={this.handleChange} /> <br />
                        <label htmlFor="zipcode">Zip code:</label> <br />
                        <input type="text" name="zipcode" onChange={this.handleChange} /> <br />
                        <label htmlFor="mobile_num">Phone Number:</label> <br />
                        <input type="text" name="mobile_num" onChange={this.handleChange} /> <br />
                        <label htmlFor="instructions">Delivery instructions:</label> <br />
                        <input type="text" name="instructions" onChange={this.handleChange} /> <br />

                        <h2>When would you like your food to be delivered?</h2>
                        <div onChange={this.handleChange}>
                            <input type="radio" value="10am - Noon" name="delivery_time" /> 10am - Noon <br />
                            <input type="radio" value="11am - 1pm" name="delivery_time" /> 11am - 1pm <br />
                            <input type="radio" value="Noon - 2pm" name="delivery_time" /> Noon - 2pm <br />
                            <input type="radio" value="1pm - 3pm" name="delivery_time" /> 1pm - 3pm <br />
                            <input type="radio" value="2pm - 4pm" name="delivery_time" /> 2pm - 4pm <br />
                            <input type="radio" value="3pm - 5pm" name="delivery_time" /> 3pm - 5pm <br />
                            <input type="radio" value="4pm - 6pm" name="delivery_time" /> 4pm - 6pm <br />
                            <input type="radio" value="5pm - 7pm" name="delivery_time" /> 5pm - 7pm <br />
                            <input type="radio" value="6pm - 8pm" name="delivery_time" /> 6pm - 8pm <br />
                            <input type="radio" value="7pm - 9pm" name="delivery_time" /> 7pm - 9pm <br />
                        </div>
                        <br />
                        <input type="submit" value="Confirm Order" />
                    </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        order_id: state.order.id,
        user: state.user
    }
}

export default connect(mapStateToProps)(DeliveryPreferences);