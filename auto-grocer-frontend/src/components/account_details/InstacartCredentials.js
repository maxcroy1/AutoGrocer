import React from 'react';
import { connect } from 'react-redux';

class InstacartCredentials extends React.Component {

    render() {
        return (
            <div>
                <h2>Instacart Credentials</h2>
                <p><strong>Email Address: </strong>{this.props.email}</p>
                <button>Edit</button>
                <p><strong>Password: </strong>********</p>
                <button>Edit</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        email: state.user.billing_settings.instacart_email
    }
}

export default connect(mapStateToProps)(InstacartCredentials);