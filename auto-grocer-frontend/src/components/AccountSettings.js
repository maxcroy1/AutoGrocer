import React from 'react';

class AccountSettings extends React.Component {
    state = {
        fname: "",
        lname: "",
        email: "",
        username: "",
        password: "",
        password_conf: ""
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.password === this.state.password_conf) {
            let configObj = this.buildFetchConfig();
            fetch('http://localhost:3000/users', configObj)
                .then(resp => resp.json())
                .then(json => console.log(json))
                .catch(error => console.log(error))
        }
    }

    buildFetchConfig() {
        let formData = {
            user: {
                fname: this.state.fname,
                lname: this.state.lname,
                email: this.state.email,
                username: this.state.username,
                password: this.state.password
            }
        }
        let configObj = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        }
        return configObj
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="fname">First Name:</label><br />
                <input type="text" name="fname" onChange={this.handleChange} /><br />

                <label htmlFor="lname">Last Name:</label><br />
                <input type="text" name="lname" onChange={this.handleChange} /><br />

                <label htmlFor="email">Email Address:</label><br />
                <input type="text" name="email" onChange={this.handleChange} /><br />

                <label htmlFor="username">Username:</label><br />
                <input type="text" name="username" onChange={this.handleChange} /><br />

                <label htmlFor="password">Password:</label><br />
                <input type="password" name="password" onChange={this.handleChange} /><br />

                <label htmlFor="password_conf">Confirm Password:</label><br />
                <input type="password" name="password_conf" onChange={this.handleChange} /><br />

                <input type="submit" value="Next: Billing Info" />
            </form>
        );
    }
}

export default AccountSettings;