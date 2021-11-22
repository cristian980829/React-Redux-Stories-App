import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import { StoriesScreen } from '../components/storie/StoriesScreen';
import  Navbar  from '../components/ui/Navbar/Navbar';
import { MyStoriesScreen } from '../components/storie/MyStoriesScreen';
import { Box } from '@mui/system';
import { UserInfoScreen } from '../components/user/UserInfoScreen';

export const StorieRouter = () => {
    return (
        <>
            <div className="animate__animated animate__fadeIn">
                <Navbar />

                <Box sx={{ mt: 6 }} />
                <CssBaseline />
                <Container fixed>
                    <Switch>
                        <Route 
                            exact
                            path="/"
                            component={ StoriesScreen }
                        />

                        <Route 
                            exact
                            path="/user/:userid/:username"
                            component={ UserInfoScreen }
                        />

                        <Route 
                            exact
                            path="/mystories"
                            component={ MyStoriesScreen }
                        />

                        <Redirect to="/" />
                    </Switch>
                </Container>
            </div>

        </>

    )
}
