import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';


export const AuthRouter = () => {
    return (
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
    )
}
