import React from 'react'
import Signup from './Signup'
import { Container } from 'react-bootstrap'
import { AuthProvider } from '../Context/AuthContext'
import Dashboard from './Dashboard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import UpdateProfile from './UpdateProfile';
import ForgotPassword from './ForgotPassword';
export default function App() {
  return (
    <div>
      <Container>
        <AuthProvider>
          <Router>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard}/>
              <PrivateRoute path="/update-profile"component={UpdateProfile}/>
              <Route path='/forgot-password' component={ForgotPassword}/>
              <Route path="/signup" component={Signup}/>
              <Route path="/login" component={Login}/>
              </Switch>
          </Router>
        </AuthProvider>
      </Container>
    </div>
      )
}
