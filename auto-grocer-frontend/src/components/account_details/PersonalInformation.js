import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import GeneralModal from './modals/GeneralModal';
import { updateUser } from '../../actions/auth';

class PersonalInformation extends React.Component {

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
                <h3>Personal Information</h3>
                <p><strong>First Name: </strong>{this.props.fname}</p>
                <Button variant="success" onClick={() => this.modalToggle("First Name", "fname")}>Edit</Button><br /><br />
                <p><strong>Last Name: </strong>{this.props.lname}</p>
                <Button variant="success" onClick={() => this.modalToggle("Last Name", "lname")}>Edit</Button><br /><br />
                <p><strong>Email Address: </strong>{this.props.email}</p>
                <Button variant="success" onClick={() => this.modalToggle("Email Address", "email")}>Edit</Button>

                <GeneralModal show={this.state.modalShow} characteristic={this.state.characteristic} label={this.state.label} onHide={this.handleEdit} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        fname: state.user.info.user.fname,
        lname: state.user.info.user.lname,
        email: state.user.info.user.email,
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

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInformation); 