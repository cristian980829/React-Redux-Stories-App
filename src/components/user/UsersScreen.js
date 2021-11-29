import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usersStartLoading } from '../../actions/user';
import { UserCard } from './UserCard';

export const UsersScreen = () => {

    const { users } = useSelector( state => state.user );

    const dispatch = useDispatch();

    useEffect(() => {
        
        dispatch( usersStartLoading() );

    }, [ dispatch ])

    return (
        <div className="animate__animated animate__fadeIn">
            {
                users.map( user => <UserCard key={user._id} data={user} /> )
            }
        </div>
    )
}
