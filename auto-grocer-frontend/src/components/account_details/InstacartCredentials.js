import React from 'react';
import { connect } from 'react-redux';

class InstacartCredentials extends React.Component {
    state = {
        email: "",
        password: ""
    }

    componentDidUpdate(prevProps) {
        if (this.props.user !== prevProps.user) {
            let configObj = this.buildInitialConfig();
            fetch('http://localhost:3000/profile', configObj)
                .then(resp => resp.json())
                .then(json => {
                    console.log(json)
                    this.setState({
                        email: json.billing_settings.instacart_email,
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
                <h2>Instacart Credentials</h2>
                <p><strong>Email Address: </strong>{this.state.email}</p>
                <button>Edit</button>
                <p><strong>Password:</strong>{this.state.password}</p>
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

export default connect(mapStateToProps)(InstacartCredentials);