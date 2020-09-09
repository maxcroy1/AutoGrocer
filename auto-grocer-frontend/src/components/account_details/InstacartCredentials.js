import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import GeneralModal from './modals/GeneralModal';
import { updateUser } from '../../actions/auth';

class InstacartCredentials extends React.Component {

    state = {
        modalShow: false,
        characteristic: "",
        label: ""
    }

    modalToggle = (editInfo = "", editLabel = "") => {
        this.setState(previousState => {
            return {
                modalShow: !previousState.modalShow
            }
        })
        if (editInfo && editLabel) {
            this.setState({
                characteristic: editInfo,
                label: editLabel
            })
        }
    }

    handleEdit = (value) => {
        this.modalToggle();
        let configObj = this.buildPatchConfig(value);
        fetch(`http://localhost:3000/billing_settings/${this.props.bs_id}`, configObj)
            .then(resp => resp.json())
            .then(json => this.props.updateUser(json))
            .catch(error => console.log(error))
    }

    buildPatchConfig = (value) => {
        let formData = {
            [this.state.label]: value
        }
        let configObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization":` Bearer ${this.props.token}`
            },
            body: JSON.stringify(formData)
        }
        return configObj
    }

    render() {
        return (
            <div className="py-3">
                <h3>Instacart Credentials</h3>
                <p><strong>Email Address: </strong>{this.props.email}</p>
                <Button variant="success" onClick={() => this.modalToggle("Email Address", "instacart_email")}>Edit</Button><br /><br />
                <p><strong>Password: </strong>********</p>
                <Button variant="success">Edit</Button>

                <GeneralModal show={this.state.modalShow} characteristic={this.state.characteristic} label={this.state.label} onHide={this.handleEdit} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        email: state.user.info.billing_settings.instacart_email,
        token: state.user.token,
        bs_id: state.user.info.billing_settings.id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateUser: (resp) => {
            dispatch(updateUser(resp));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InstacartCredentials);