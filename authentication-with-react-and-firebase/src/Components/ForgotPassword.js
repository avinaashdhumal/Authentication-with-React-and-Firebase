import React, { useState, useRef } from 'react'
import { useAuth } from '../Context/AuthContext'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Signup.css'
export default function ForgotPassword() {
    const emailRef = useRef();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { resetPassword } = useAuth();
    const [message, setMessage] = useState('')
    async function handleReset(e) {
        e.preventDefault();
        try {
            setError('');
            setMessage("")
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage('Password reset email sent, Please check email box');
        } catch {
            setError('Error sending email')
        }
        setLoading(false)
    }
    return (
        <div className="form-container">
            <div>
                <Card className=" bg-black text-white" >
                    <Card.Title className="text-center mt-3">Login</Card.Title>
                    <Card.Body>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {message && <Alert variant="success">{message}</Alert>}
                        <Form onSubmit={handleReset}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" ref={emailRef} placeholder="Enter email" required />
                            </Form.Group>
                            <div className="text-center">
                                <Button disabled={loading} variant="primary" type="submit">
                                    Reset
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
            <div className="w-100 text-center mt-2">
                Want to go back? <Link to="/login">Login</Link>
            </div>
        </div>
    )
}
