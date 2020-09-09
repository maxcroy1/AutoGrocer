import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

class GeneralModal extends React.Component {
    state = {
        value: ""
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value
        })
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
                            <Form.Label htmlFor={this.props.label}>New {this.props.characteristic}</Form.Label>
                            <Form.Control type="text" name={this.props.label} onChange={this.handleChange}></Form.Control>
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

export default GeneralModal;