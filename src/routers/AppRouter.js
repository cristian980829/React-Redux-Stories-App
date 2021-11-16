import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from 'react-router-dom';
import Swal from 'sweetalert2';
import { startChecking } from '../actions/auth';
import { AuthRouter } from './AuthRouter';

import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { StorieRouter } from './StorieRouter';
  

export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, uid } = useSelector( state => state.auth);

    useEffect(() => {
        
        dispatch( startChecking() );

    }, [dispatch])

    if ( checking ) {
        Swal.fire({
            text:'Wait...',
            showConfirmButton: false,
            allowOutsideClick: false
        });
        Swal.showLoading();
        return( <div></div> )
    }else{
        Swal.close();
    }

    return (
        <Router>
            <Switch>
                
                <PublicRoute 
                    component={ AuthRouter }
                    isAuthenticated={ !!uid }
                    path="/auth"
                />

                <PrivateRoute 
                    component={ StorieRouter }
                    isAuthenticated={ !!uid }
                    path="/"
                />

                <Redirect to="/auth/signin" />

            </Switch>
        </Router>
    )
}
