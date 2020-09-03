import React from 'react';
import { connect } from 'react-redux';

class AccountInformation extends React.Component {

    state = {
        username: "",
        password: ""
    }

    componentDidUpdate(prevProps) {
        if (this.props.user !== prevProps.user) {
            let configObj = this.buildInitialConfig();
            fetch('http://localhost:3000/profile', configObj)
                .then(resp => resp.json())
                .then(json => {
                    this.setState({
                        username: json.user.username,
                        password: "********"
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
                <h2>Account Information</h2>
                <p><strong>Username: </strong>{this.state.username}</p>
                <button>Edit</button>
                <p><strong>Password: </strong>{this.state.password}</p>
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

export default connect(mapStateToProps)(AccountInformation);