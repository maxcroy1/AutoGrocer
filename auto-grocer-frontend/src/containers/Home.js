import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

function Home() {
    return (
        <div>
            <Container fluid style={{background: '#42b02a'}}>
                <Row style={{minHeight: '45vh'}}>
                    <Col className="my-auto text-center">
                        <img src={process.env.PUBLIC_URL + "/autogrocerlogo.svg"} alt="autgrocer logo" style={{height: '10vw', maxHeight: '100px'}} />
                        <p style={{color: '#FFF'}}>Take grocery shopping off your to-do list - <em>forever</em>.</p>
                        <Button variant="outline-light">
                            <NavLink to="/register" className="signup_button">Sign up now</NavLink>
                        </Button>
                    </Col>
                </Row>
            </Container>
            <Container fluid>
                <Row style={{minHeight: '45vh'}}>
                    <Col lg="3"></Col>
                    <Col lg="6" className='my-auto text-center'>
                        <h2>About</h2>
                        <p>Autogrocer is an automated service that orders groceries for you on a weekly schedule so you don't have to worry about filling your fridge. All you have to do is add your Instacart login information, select the groceries you'd like to receive in your order, and choose a date and a time for your deliveries.</p>
                        <p>Autogrocer will handle the rest.</p>
                    </Col>
                    <Col lg="3">
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Home;