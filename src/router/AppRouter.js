import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from 'react-router-dom';
import { AuthRouter } from './AuthRouter';

import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { StorieRouter } from './StorieRouter';
  

export const AppRouter = () => {

    // const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    const isLoggedIn = false;
    return (
        <Router>
            <Switch>
                
                <PublicRoute 
                    path="/auth"
                    component={ AuthRouter }
                    isAuthenticated={ isLoggedIn }
                />

                <PrivateRoute 
                    isAuthenticated={ isLoggedIn }
                    path="/"
                    component={ StorieRouter }
                />

                <Redirect to="/auth/signin" />

            </Switch>
        </Router>
    )
}
