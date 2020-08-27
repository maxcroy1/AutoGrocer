import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../actions/auth'

function Navbar(props) {
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
            {props.user ? <NavLink to="/account" exact>Account</NavLink> : <NavLink to="/register" exact>Sign up</NavLink> }
            {props.user ? <button onClick={handleLogout}>Log out</button>  : <button><NavLink to="/login" exact>Log in</NavLink></button>}
        </nav>
    );
}

function handleLogout() {
    this.props.logOut()
}

const mapStateToProps = (state) => {
    return { user: state.user }
}

const mapDispatchToProps = dispatch => {
    return {
        logOut: () => {
            dispatch(logOut)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);