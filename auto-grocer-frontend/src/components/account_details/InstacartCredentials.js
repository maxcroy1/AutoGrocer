import React from 'react';

class InstacartCredentials extends React.Component {
    state = {}

    render() {
        return (
            <div>
                <h2>Instacart Credentials</h2>
                <p><strong>Email Address:</strong></p>
                <button>Edit</button>
                <p><strong>Password:</strong></p>
                <button>Edit</button>
            </div>
        );
    }
}

export default InstacartCredentials;