import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Button, InputGroup } from 'react-bootstrap';
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
            <div className="py-2">
                    <Form>
                        <h2>Delivery Preferences</h2>
                        <p>Where would you like your food to be delivered?</p>
                        <Form.Label htmlFor="address_one">Address Line 1:</Form.Label> <br />
                        <Form.Control type="text" name="address_one" defaultValue={this.state.address_one} onChange={this.handleChange} /> <br />
                        <Form.Label htmlFor="address_two">Address Line 2:</Form.Label> <br />
                        <Form.Control type="text" name="address_two" defaultValue={this.state.address_two} onChange={this.handleChange} /> <br />
                        <Form.Label htmlFor="zipcode">Zip code:</Form.Label> <br />
                        <Form.Control type="text" name="zipcode" defaultValue={this.state.zipcode} onChange={this.handleChange} /> <br />
                        <Form.Label htmlFor="phone">Phone Number:</Form.Label> <br />
                        <Form.Control type="text" name="phone" defaultValue={this.state.phone} onChange={this.handleChange} /> <br />
                        <Form.Label htmlFor="instructions">Delivery instructions:</Form.Label> <br />
                        <Form.Control type="text" name="instructions" defaultValue={this.state.instructions} onChange={this.handleChange} /> <br />

                        <p>When would you like your food to be delivered?</p>
                        <Form.Label>Day of week:</Form.Label>
                        <div onChange={this.handleChange}>
                            <Form.Check type="radio" value="Sunday" label="Sunday" name="day" checked={this.state.day === "Sunday" ? true : false} />
                            <Form.Check type="radio" value="Monday" label="Monday" name="day" checked={this.state.day === "Monday" ? true : false} />
                            <Form.Check type="radio" value="Tuesday" label="Tuesday" name="day" checked={this.state.day === "Tuesday" ? true : false} />
                            <Form.Check type="radio" value="Wednesday" label="Wednesday" name="day" checked={this.state.day === "Wednesday" ? true : false} />
                            <Form.Check type="radio" value="Thursday" label="Thursday" name="day" checked={this.state.day === "Thursday" ? true : false} />
                            <Form.Check type="radio" value="Friday" label="Friday" name="day" checked={this.state.day === "Friday" ? true : false} />
                            <Form.Check type="radio" value="Saturday" label="Saturday" name="day" checked={this.state.day === "Saturday" ? true : false} />
                        </div><br />
                        <Form.Label>Time of day:</Form.Label>
                        <div onChange={this.handleChange}>
                            <Form.Check type="radio" value="10am - Noon" label="10am - Noon" name="time" checked={this.state.time === "10am - Noon" ? true : false} />
                            <Form.Check type="radio" value="11am - 1pm" label="11am - 1pm" name="time" checked={this.state.time === "11am - 1pm" ? true : false} />
                            <Form.Check type="radio" value="Noon - 2pm" label="Noon - 2pm" name="time" checked={this.state.time === "Noon - 2pm" ? true : false} />
                            <Form.Check type="radio" value="1pm - 3pm" label="1pm - 3pm" name="time" checked={this.state.time === "1pm - 3pm" ? true : false} />
                            <Form.Check type="radio" value="3pm - 5pm" label="3pm - 5pm" name="time" checked={this.state.time === "3pm - 5pm" ? true : false} />
                            <Form.Check type="radio" value="4pm - 6pm" label="4pm - 6pm" name="time" checked={this.state.time === "4pm - 6pm" ? true : false} />
                            <Form.Check type="radio" value="5pm - 7pm" label="5pm - 7pm" name="time" checked={this.state.time === "5pm - 7pm" ? true : false} />
                            <Form.Check type="radio" value="6pm - 8pm" label="6pm - 8pm" name="time" checked={this.state.time === "6pm - 8pm" ? true : false} />
                            <Form.Check type="radio" value="7pm - 9pm" label="7pm - 9pm" name="time" checked={this.state.time === "7pm - 9pm" ? true : false} />
                        </div>
                        <br />
                        <Link to={'/shop/confirmation'} onClick={this.handleSubmit}>
                            <Button type="submit" variant="success" value="Confirm Order">
                            Confirm Order
                            </Button>
                        </Link>
                    </Form>
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