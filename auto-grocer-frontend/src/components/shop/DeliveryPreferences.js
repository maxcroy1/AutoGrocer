import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addOptions } from '../../actions/delivery';

class DeliveryPreferences extends React.Component {
    state = {
        address_one: this.props.address_one,
        address_two: this.props.address_two,
        zipcode: this.props.zipcode,
        instructions: this.props.instructions,
        time: this.props.time,
        phone: this.props.phone,
        day: this.props.day
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = () => {
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
                'Authorization': `Bearer ${this.props.user.token}`
            },
            body: JSON.stringify(formData)
        }
        return configObj;
    }

    render() {
        return (
            <div>
                    <form>
                        <p>Where would you like your food to be delivered?</p>
                        <label htmlFor="address_one">Address Line 1:</label> <br />
                        <input type="text" name="address_one" defaultValue={this.state.address_one} onChange={this.handleChange} /> <br />
                        <label htmlFor="address_two">Address Line 2:</label> <br />
                        <input type="text" name="address_two" defaultValue={this.state.address_two} onChange={this.handleChange} /> <br />
                        <label htmlFor="zipcode">Zip code:</label> <br />
                        <input type="text" name="zipcode" defaultValue={this.state.zipcode} onChange={this.handleChange} /> <br />
                        <label htmlFor="phone">Phone Number:</label> <br />
                        <input type="text" name="phone" defaultValue={this.state.phone} onChange={this.handleChange} /> <br />
                        <label htmlFor="instructions">Delivery instructions:</label> <br />
                        <input type="text" name="instructions" defaultValue={this.state.instructions} onChange={this.handleChange} /> <br />

                        <p>When would you like your food to be delivered?</p>
                        <label>Day of week:</label>
                        <div onChange={this.handleChange}>
                            <input type="radio" value="Sunday" name="day" checked={this.state.day === "Sunday" ? true : false} /> Sunday <br />
                            <input type="radio" value="Monday" name="day" checked={this.state.day === "Monday" ? true : false} /> Monday <br />
                            <input type="radio" value="Tuesday" name="day" checked={this.state.day === "Tuesday" ? true : false} /> Tuesday <br />
                            <input type="radio" value="Wednesday" name="day" checked={this.state.day === "Wednesday" ? true : false} /> Wednesday <br />
                            <input type="radio" value="Thursday" name="day" checked={this.state.day === "Thursday" ? true : false} /> Thursday <br />
                            <input type="radio" value="Friday" name="day" checked={this.state.day === "Friday" ? true : false} /> Friday <br />
                            <input type="radio" value="Saturday" name="day" checked={this.state.day === "Saturday" ? true : false} /> Saturday <br />
                        </div><br />
                        <label>Time of day:</label>
                        <div onChange={this.handleChange}>
                            <input type="radio" value="10am - Noon" name="time" checked={this.state.time === "10am - Noon" ? true : false} /> 10am - Noon <br />
                            <input type="radio" value="11am - 1pm" name="time" checked={this.state.time === "11am - 1pm" ? true : false} /> 11am - 1pm <br />
                            <input type="radio" value="Noon - 2pm" name="time" checked={this.state.time === "Noon - 2pm" ? true : false} /> Noon - 2pm <br />
                            <input type="radio" value="1pm - 3pm" name="time" checked={this.state.time === "1pm - 3pm" ? true : false} /> 1pm - 3pm <br />
                            <input type="radio" value="2pm - 4pm" name="time" checked={this.state.time === "2pm - 4pm" ? true : false} /> 2pm - 4pm <br />
                            <input type="radio" value="3pm - 5pm" name="time" checked={this.state.time === "3pm - 5pm" ? true : false} /> 3pm - 5pm <br />
                            <input type="radio" value="4pm - 6pm" name="time" checked={this.state.time === "4pm - 6pm" ? true : false} /> 4pm - 6pm <br />
                            <input type="radio" value="5pm - 7pm" name="time" checked={this.state.time === "5pm - 7pm" ? true : false} /> 5pm - 7pm <br />
                            <input type="radio" value="6pm - 8pm" name="time" checked={this.state.time === "6pm - 8pm" ? true : false} /> 6pm - 8pm <br />
                            <input type="radio" value="7pm - 9pm" name="time" checked={this.state.time === "7pm - 9pm" ? true : false} /> 7pm - 9pm <br />
                        </div>
                        <br />
                        <Link to={'/shop/confirmation'} onClick={this.handleSubmit}><input type="submit" value="Confirm Order" /></Link>
                    </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        order_id: state.order.id,
        user: state.user,
        day: state.delivery.day,
        time: state.delivery.time,
        address_one: state.delivery.address_one,
        address_two: state.delivery.address_two,
        zipcode: state.delivery.zipcode,
        phone: state.delivery.phone,
        instructions: state.delivery.instructions
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