import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route
  } from 'react-router-dom';
import { LoginScreen } from '../auth/LoginScreen';
import { RegisterScreen } from '../auth/RegisterScreen';
  




export const AppRouter = () => {

    return (
        <Router>
            <Switch>

                <Route 
                    exact 
                    path="/auth/signin" 
                    component={ LoginScreen }
                />

                <Route 
                    exact 
                    path="/auth/signup" 
                    component={ RegisterScreen }
                />

                <Redirect to="/auth/signin" />

            </Switch>
        </Router>
    )
}
