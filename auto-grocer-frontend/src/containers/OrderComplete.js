import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

class OrderComplete extends React.Component {
    render() {
        return (
            <Container className="py-3 my-auto text-center">
                <Row style={{minHeight: '60vh'}}>
                    <Col md="3"></Col>
                    <Col md="6" className='my-auto text-center px-3'>
                        <h1>Your order is complete</h1>
                        <p>Enjoy your groceries!</p>
                        <img src={process.env.PUBLIC_URL + "/good.svg"} alt="autgrocer logo" style={{height: '10vw', maxHeight: '100px'}} />
                    </Col>
                    <Col md="3"></Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        order: state.order.id
    }
}

export default connect(mapStateToProps)(OrderComplete);