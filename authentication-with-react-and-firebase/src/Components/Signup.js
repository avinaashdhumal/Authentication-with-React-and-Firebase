import React, { useState, useRef } from 'react'
import { useAuth } from '../Context/AuthContext'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import './Signup.css'
export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const history = useHistory();
    async function handleSubmit(e) {
        e.preventDefault();
        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            return setError('Password not match')
        }
        try {
            setError('');
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push('/')

        } catch {
            setError('Signup error')
        }
        setLoading(false)
    }
    return (
        <div className="form-container">
            <div>
                <Card className=" bg-black text-white" >
                    <Card.Title className="text-center mt-3">Sign up</Card.Title>
                    <Card.Body>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" ref={emailRef} placeholder="Enter email" required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={passwordRef} placeholder="Password" required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" ref={confirmPasswordRef} placeholder="Password" required />
                            </Form.Group>
                            <div className="text-center">
                                <Button disabled={loading} variant="primary" type="submit">
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login">Login</Link>
            </div>
        </div>
    )
}
