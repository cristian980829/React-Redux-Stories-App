import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import { StorieScreen } from '../components/storie/StorieScreen';
import  Navbar  from '../components/ui/Navbar/Navbar';
import { MyStories } from '../components/storie/MyStories';

export const StorieRouter = () => {
    return (
        <>
            <Navbar />
            <div className="animate__animated animate__fadeIn">
                <CssBaseline />
                <Container fixed>
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
                            component={ MyStories }
                        />

                        <Redirect to="/" />
                    </Switch>
                </Container>
            </div>

        </>

    )
}
