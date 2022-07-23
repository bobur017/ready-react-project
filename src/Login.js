import React, { useEffect, useRef } from 'react'
import { Card, Col, Container, Form, FormLabel, Row, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from './QrReducer';


function Login() {

    const dispatch = useDispatch();
    const resultToken = useSelector(state => state.qr.token);
    const error = useSelector(state => state.qr.error);
    const history = useNavigate();
    const firstUpdate = useRef(true);

    useEffect(() => {

    }, [resultToken]);

    useEffect(() => {

    }, [error]);

    const submitChange = (e) => {

        //klkjljljlj
    }


    return (
        <div className="login">
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} md={12} lg={6} xl={4}>
                        <Card className=' text-center'>
                            <Card.Body>
                                <Card.Title>KIRISH</Card.Title>
                                <Form onSubmit={submitChange} id="userForm">
                                    <Form.Label>Login</Form.Label>
                                    <Form.Control name="login" required minLength={5} />
                                    <Form.Label>Parol</Form.Label>
                                    <Form.Control name="password" required minLength={8} />

                                    <br />
                                    <div className="d-grid gap-2">
                                        <Button type='submit' form="userForm">KIRISH</Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div >
    )
}

export default Login