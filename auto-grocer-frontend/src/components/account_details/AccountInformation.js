import React from 'react';

class AccountInformation extends React.Component {
    state = {}

    render() {
        return (
            <div>
                <h2>Account Information</h2>
                <p><strong>Username:</strong></p>
                <button>Edit</button>
                <p><strong>Password:</strong></p>
                <button>Edit</button>
            </div>
        );
    }
}

export default AccountInformation;