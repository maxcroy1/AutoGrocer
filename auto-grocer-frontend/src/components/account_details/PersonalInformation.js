import React from 'react';
import { connect } from 'react-redux';

class PersonalInformation extends React.Component {
    state = {
        fname: "",
        lname: "",
        email: "",
        phone: ""
    }

    componentDidUpdate(prevProps) {
        if (this.props.user !== prevProps.user) {
            let configObj = this.buildInitialConfig();
            fetch('http://localhost:3000/profile', configObj)
                .then(resp => resp.json())
                .then(json => {
                    this.setState({
                        fname: json.user.fname,
                        lname: json.user.lname,
                        email: json.user.email
                    })
                })
                .catch(error => console.log(error))
        }
    }

    buildInitialConfig = () => {
        let configObj = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${this.props.user}`
            }
        }
        return configObj
    }

    render() {
        return (
            <div>
                <h2>Personal Information</h2>
                <p><strong>First Name: </strong>{this.state.fname}</p>
                <button>Edit</button>
                <p><strong>Last Name: </strong>{this.state.lname}</p>
                <button>Edit</button>
                <p><strong>Email Address: </strong>{this.state.email}</p>
                <button>Edit</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(PersonalInformation);