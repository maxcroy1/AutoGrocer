import React from 'react';
import { connect } from 'react-redux';

class AccountInformation extends React.Component {

    render() {
        return (
            <div>
                <h2>Account Information</h2>
                <p><strong>Username: </strong>{this.props.username}</p>
                <button>Edit</button>
                <p><strong>Password: </strong>********</p>
                <button>Edit</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.user.username
    }
}

export default connect(mapStateToProps)(AccountInformation);