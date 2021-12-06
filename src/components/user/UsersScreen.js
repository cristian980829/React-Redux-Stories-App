import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usersStartLoading } from '../../actions/user';
import { UserCard } from './UserCard';

import List from '@mui/material/List';

export const UsersScreen = () => {

    const { users } = useSelector( state => state.user );

    const dispatch = useDispatch();

    useEffect(() => {
        
        dispatch( usersStartLoading() );

    }, [ dispatch ])

    return (
        <div className="animate__animated animate__fadeIn">
            <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
                {
                    users.map( user => <UserCard key={user.uid} data={user} /> )
                }
            </List>
        </div>
    )
}
