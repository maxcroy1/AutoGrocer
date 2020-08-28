import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../actions/auth'

class Navbar extends React.Component {
    
    handleLogout = () => {
        localStorage.removeItem('ag_token');
        this.props.logOut();
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
                {this.props.user ? <NavLink to="/account" exact>Account</NavLink> : <NavLink to="/register" exact>Sign up</NavLink> }
                {this.props.user ? <button onClick={this.handleLogout}>Log out</button>  : <button><NavLink to="/login" exact>Log in</NavLink></button>}
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);