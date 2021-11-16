import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route
  } from 'react-router-dom';
import Swal from 'sweetalert2';
import { startChecking } from '../actions/auth';

import { AuthRouter } from './AuthRouter';

import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { StorieRouter } from './StorieRouter';

import { ErrorScreen } from '../components/ui/ErrorScreen';

  

export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, uid, serverError } = useSelector( state => state.auth);

    console.log(serverError)

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
                { (serverError) 
                    ? <>
                        <Route
                            exact
                            path="/error"
                            component={ ErrorScreen }
                        />
                        <Redirect to="/error" />
                    </>
                    : <>
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

                        { (!serverError) ? <Redirect to="/auth/signin" /> : console.log() }

                        <Redirect to="/auth/signin" />
                    </>
                }

            </Switch>
        </Router>
    )
}
