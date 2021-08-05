import React, { useState, useRef } from 'react'
import { useAuth } from '../Context/AuthContext'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('')
    const { currentUser, updateEmail, updatePassword } = useAuth();
    const history = useHistory();
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading('');
        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            return setError('Password do not match')
        }
        const promises = [];
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }
        Promise.all(promises).then(() => {
            setMessage('Profile updated successfully')
            // history.push('/');
        }).catch(() => {
            setError('There was an error updating your profile');
        }).finally(() => {
            setLoading(false);
        })
    }
    return (
        <div className="form-container">
            <div>
                <Card className=" bg-black text-white" >
                    <Card.Title className="text-center mt-3">Update Profile</Card.Title>
                    <Card.Body>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {message && <Alert variant="success">{message}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" ref={emailRef} placeholder="Enter email" defaultValue={currentUser.email} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={passwordRef} placeholder="Leave blank to keep the same" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" ref={confirmPasswordRef} placeholder="Leave blank to keep the same" />
                            </Form.Group>
                            <div className="text-center">
                                <Button disabled={loading} variant="primary" type="submit">
                                    Update Profile
                                </Button>
                            </div>
                        </Form>

                    </Card.Body>
                    <Link to="/" className="btn btn-primary">Go to the dashboard</Link>
                </Card>
            </div>
        </div>
    )
}
