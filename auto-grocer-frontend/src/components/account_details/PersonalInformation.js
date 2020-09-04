import React from 'react';
import { connect } from 'react-redux';

class PersonalInformation extends React.Component {

    render() {
        return (
            <div>
                <h2>Personal Information</h2>
                <p><strong>First Name: </strong>{this.props.fname}</p>
                <button>Edit</button>
                <p><strong>Last Name: </strong>{this.props.lname}</p>
                <button>Edit</button>
                <p><strong>Email Address: </strong>{this.props.email}</p>
                <button>Edit</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        fname: state.user.info.user.fname,
        lname: state.user.info.user.lname,
        email: state.user.info.user.email
    }
}

export default connect(mapStateToProps)(PersonalInformation); 