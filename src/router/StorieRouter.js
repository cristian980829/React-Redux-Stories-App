import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { StorieScreen } from '../components/storie/StorieScreen';
import  Navbar  from '../components/ui/Navbar/Navbar';

export const StorieRouter = () => {
    return (
        <>
            <Navbar />

            <Switch>
                <Route 
                    exact
                    path="/"
                    component={ StorieScreen }
                />

                <Route 
                    exact
                    path="/stories"
                    component={ StorieScreen }
                />

                <Route 
                    exact
                    path="/mystories"
                    component={ StorieScreen }
                />

                <Redirect to="/" />


            </Switch>
        </>

    )
}
