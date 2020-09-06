import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { fetchUserData, logOut } from '../actions/auth';
import { registrationLogout } from '../actions/registration';

class NavBar extends React.Component {
    
    handleLogout = () => {
        localStorage.removeItem('ag_token');
        this.props.logOut();
        this.props.registrationLogout();
    }

    render() {
        return (
            <Navbar expand="md" variant="light" style={{background: '#42b02a'}} className="py-3">
                <Container>
                    <Navbar.Brand>
                        <NavLink to="/" exact>  
                            <img src={process.env.PUBLIC_URL + "/autogrocerlogo.svg"} alt="autgrocer logo" style={{height: '4vw', minHeight: '20px', maxHeight: '30px'}} />
                        </NavLink>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{borderColor: '#FFF'}} />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link>
                                <NavLink to="/" exact activeClassName="active_menu_item" className="menu_item">
                                    Home
                                </NavLink>
                            </Nav.Link>
                            <Nav.Link>
                                <NavLink to="/shop" exact activeClassName="active_menu_item" className="menu_item">
                                    Shop
                                </NavLink>
                            </Nav.Link>
                            <Nav.Link>
                                {this.props.user.token ? <NavLink to="/account_details" onClick={this.props.fetchUserData} exact activeClassName="active_menu_item" className="menu_item">Account</NavLink> : <NavLink to="/register" exact activeClassName="active_menu_item" className="menu_item">Sign up</NavLink> }
                            </Nav.Link>
                            <Nav.Link>
                                {this.props.user.token ? <NavLink to="/" onClick={this.handleLogout} className="menu_item">Log out</NavLink>  : <NavLink to="/login" exact activeClassName="active_menu_item" className="menu_item">Log in</NavLink>}
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
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

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);