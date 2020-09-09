import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

class PasswordModal extends React.Component {
    state = {
        value: "",
        old_pass: "",
        new_pass_conf: ""
    }

    handleChange = (event) => {
        if (event.target.name === this.props.value) {
            this.setState({
                value: event.target.value
            })
        } else {
            this.setState({
                [event.target.name]: event.target.value
            })
        }
    }

    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closebutton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit {this.props.characteristic}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label htmlFor="old_pass">Old Password</Form.Label>
                            <Form.Control type="password" name="old_pass" onChange={this.handleChange}></Form.Control>
                            <Form.Label htmlFor={this.props.label}>New {this.props.characteristic}</Form.Label>
                            <Form.Control type="password" name={this.props.label} onChange={this.handleChange}></Form.Control>
                            <Form.Label htmlFor="new_pass_conf">Confirm Password</Form.Label>
                            <Form.Control type="password" name="new_pass_conf" onChange={this.state.value === this.state.new_pass_conf ? this.handleChange : null}></Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => this.props.onHide(this.state.value)} variant="success">Save</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default PasswordModal;