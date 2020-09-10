import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import GeneralModal from './modals/GeneralModal';
import PasswordModal from './modals/PasswordModal';
import { updateUser } from '../../actions/auth';

class AccountInformation extends React.Component {

    state = {
        modalShow: false,
        passModal: false,
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

    passToggle = (editInfo = "", editLabel = "") => {
        this.setState(previousState => {
            return {
                passModal: !previousState.passModal
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
        if (this.state.modalShow) {
            this.modalToggle();
        }
        if (this.state.passModal) {
            this.passToggle();
        }
        let configObj = this.buildPatchConfig(value);
        fetch(`http://localhost:3000/users/${this.props.user_id}`, configObj)
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
            <div>
                <h3>Account Information</h3>
                <p><strong>Username: </strong>{this.props.username}</p>
                <Button variant="success" onClick={() => this.modalToggle("Username", "username")}>Edit</Button><br /><br />
                <p><strong>Password: </strong>********</p>
                <Button variant="success" onClick={() => this.passToggle("Username", "username")}>Edit</Button>

                <GeneralModal show={this.state.modalShow} characteristic={this.state.characteristic} label={this.state.label} onHide={this.handleEdit} />
                <PasswordModal show={this.state.passModal} characteristic={this.state.characteristic} label={this.state.label} onHide={this.handleEdit} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.user.info.user.username,
        token: state.user.token,
        user_id: state.user.info.user.id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateUser: (resp) => {
            dispatch(updateUser(resp));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountInformation);