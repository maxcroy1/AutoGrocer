import React from 'react';

class PersonalInformation extends React.Component {
    state = {}

    render() {
        return (
            <div>
                <h2>Personal Information</h2>
                <p><strong>First Name:</strong></p>
                <button>Edit</button>
                <p><strong>Last Name:</strong></p>
                <button>Edit</button>
                <p><strong>Email Address:</strong></p>
                <button>Edit</button>
                <p><strong>Phone Number:</strong></p>
                <button>Edit</button>
            </div>
        );
    }
}

export default PersonalInformation;