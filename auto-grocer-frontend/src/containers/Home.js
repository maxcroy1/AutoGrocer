import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

function Home() {
    return (
        <div>
            <Container fluid style={{background: '#42b02a'}}>
                <Row style={{minHeight: '45vh'}}>
                    <Col className="home-hero-left"></Col>
                    <Col md='6' className="my-auto text-center">
                        <img src={process.env.PUBLIC_URL + "/autogrocerlogo.svg"} alt="autgrocer logo" style={{height: '10vw', maxHeight: '100px'}} />
                        <p style={{color: '#FFF'}}>Take grocery shopping off your to-do list - <em>forever</em>.</p>
                        <Button variant="outline-light">
                            <NavLink to="/register" className="signup_button">Sign up now</NavLink>
                        </Button>
                    </Col>
                    <Col className="home-hero-right"></Col>
                </Row>
            </Container>
            <Container fluid>
                <Row style={{minHeight: '45vh'}}>
                    <Col md="3"></Col>
                    <Col md="6" className='my-auto text-center px-3'>
                        <h2>About</h2>
                        <p>AutoGrocer is an automated service that orders groceries for you on a weekly schedule so you don't have to worry about filling your fridge.</p>
                        <p>All you have to do is add your Instacart login information, select the groceries you'd like to receive, and choose a date and a time for your deliveries.</p>
                        <p>AutoGrocer will handle the rest.</p>
                    </Col>
                    <Col md="3">
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Home;