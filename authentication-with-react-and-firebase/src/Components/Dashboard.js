import React, { useState } from 'react'
import { useAuth } from '../Context/AuthContext'
import { Card, Button, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import './dashboard.css'
export default function Dashboard() {
    const [error, setError] = useState('')
    const { logout, currentUser } = useAuth();
    const history = useHistory()
    async function handleLogout() {
        setError('');
        try {
            await logout()
            history.push('/login')
        } catch {
            setError('Error logging out')
        }
    }
    return (
        <div className="form-container">
            <Card border="dark" className="text-center bg-light text-black">
                <Card.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Card.Title><strong>Email:</strong>{currentUser.email}</Card.Title>
                </Card.Body>
                <div className="flex-container">
                    <Link to="/update-profile" className="btn btn-primary">Update Profile</Link>
                    <Button onClick={handleLogout}>Logout</Button>
                </div>

            </Card>

        </div>
    )
}
