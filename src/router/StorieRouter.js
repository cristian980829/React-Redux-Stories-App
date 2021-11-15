import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { LoginScreen } from '../components/auth/LoginScreen';
import { StorieScreen } from '../components/storie/StorieScreen';

export const StorieRouter = () => {
    return (
        <Switch>
            <Route 
                exact
                path="/"
                component={ StorieScreen }
            />

            <Redirect to="/" />


        </Switch>
    )
}
