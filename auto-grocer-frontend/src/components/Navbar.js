import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserData, logOut } from '../actions/auth';
import { registrationLogout } from '../actions/registration';

class Navbar extends React.Component {
    
    handleLogout = () => {
        localStorage.removeItem('ag_token');
        this.props.logOut();
        this.props.registrationLogout();
    }

    render() {
        return (
            <nav>
                <NavLink to="/" exact>  
                    AutoGrocer Logo
                </NavLink>
                <NavLink to="/" exact>
                    Home
                </NavLink>
                <NavLink to="/shop" exact>
                    Shop
                </NavLink>
                {this.props.user.token ? <NavLink to="/account_details" onClick={this.props.fetchUserData} exact>Account</NavLink> : <NavLink to="/register" exact>Sign up</NavLink> }
                {this.props.user.token ? <NavLink to="/" onClick={this.handleLogout}>Log out</NavLink>  : <button><NavLink to="/login" exact>Log in</NavLink></button>}
            </nav>
        );
    }
}

const mapStateToProps = (state) => {
    return { user: state.user }
}

const mapDispatchToProps = dispatch => {
    return {
        logOut: () => {
            dispatch(logOut())
        },
        registrationLogout: () => {
            dispatch(registrationLogout())
        },
        fetchUserData: () => {
            dispatch(fetchUserData())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);