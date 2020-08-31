import React from 'react';
import { connect } from 'react-redux';
import { addOptions } from '../actions/delivery';

class DeliveryPreferences extends React.Component {
    state = {
        address_one: "",
        address_two: "",
        zipcode: "",
        instructions: "",
        time: "",
        phone: "",
        day: ""
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let configObj = this.buildConfigObj();
        fetch(`http://localhost:3000/orders/${this.props.order_id}`, configObj)
            .then(resp => resp.json())
            .then(json => {
                this.props.addOptions(json.order)
            })
            .catch(error => console.log(error))
    }

    buildConfigObj = () => {
        let formData = {
            delivery_address_one: this.state.address_one,
            delivery_address_two: this.state.address_two,
            zipcode: this.state.zipcode,
            instructions: this.state.instructions,
            day: this.state.day,
            time: this.state.time,
            mobile_num: this.state.phone
        }
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
                        <label htmlFor="phone">Phone Number:</label> <br />
                        <input type="text" name="phone" onChange={this.handleChange} /> <br />
                        <label htmlFor="instructions">Delivery instructions:</label> <br />
                        <input type="text" name="instructions" onChange={this.handleChange} /> <br />

                        <h2>When would you like your food to be delivered?</h2>
                        <h3>Day of week:</h3>
                            <div onChange={this.handleChange}>
                                <input type="radio" value="Sunday" name="day" /> Sunday <br />
                                <input type="radio" value="Monday" name="day" /> Monday <br />
                                <input type="radio" value="Tuesday" name="day" /> Tuesday <br />
                                <input type="radio" value="Wednesday" name="day" /> Wednesday <br />
                                <input type="radio" value="Thursday" name="day" /> Thursday <br />
                                <input type="radio" value="Friday" name="day" /> Friday <br />
                                <input type="radio" value="Saturday" name="day" /> Saturday <br />
                            </div>
                        <h3>Time of day:</h3>
                        <div onChange={this.handleChange}>
                            <input type="radio" value="10am - Noon" name="time" /> 10am - Noon <br />
                            <input type="radio" value="11am - 1pm" name="time" /> 11am - 1pm <br />
                            <input type="radio" value="Noon - 2pm" name="time" /> Noon - 2pm <br />
                            <input type="radio" value="1pm - 3pm" name="time" /> 1pm - 3pm <br />
                            <input type="radio" value="2pm - 4pm" name="time" /> 2pm - 4pm <br />
                            <input type="radio" value="3pm - 5pm" name="time" /> 3pm - 5pm <br />
                            <input type="radio" value="4pm - 6pm" name="time" /> 4pm - 6pm <br />
                            <input type="radio" value="5pm - 7pm" name="time" /> 5pm - 7pm <br />
                            <input type="radio" value="6pm - 8pm" name="time" /> 6pm - 8pm <br />
                            <input type="radio" value="7pm - 9pm" name="time" /> 7pm - 9pm <br />
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

const mapDispatchToProps = dispatch => {
    return {
        addOptions: (options) => {
            dispatch(addOptions(options))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryPreferences);