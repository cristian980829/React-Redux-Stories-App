import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CardActions } from '@mui/material';
import { storieStartLoading } from '../../actions/storie';
import { StorieCard } from '../storie/StorieCard';
import { UserModal } from '../user/UserModal';
import { startUserSetActive } from '../../actions/user';
import { uiUserOpenModal, uiModalViewModel } from '../../actions/ui';
import { StorieModal } from '../storie/StorieModal';

export const UserInfoScreen = () => {

    const dispatch = useDispatch();
    const { stories } = useSelector( state => state.storie );

    const { userid, username } = useParams();

    const handleViewProfile = () => {
        dispatch( startUserSetActive(userid) );
        dispatch( uiModalViewModel() );
        dispatch( uiUserOpenModal() );
    }

    useEffect(() => {
        
        dispatch( storieStartLoading() );

    }, [ dispatch ])

    return (
        <div className="animate__animated animate__fadeIn">

            <h1>Historias de {username}</h1>
            <hr/>

            <CardActions>
                <div className="text-link pointer" onClick={handleViewProfile}>
                    View profile
                </div>  
            </CardActions>

            {
                stories.map( storie => (storie.user._id===userid) && <StorieCard key={storie._id} data={storie} /> )
            }

            <StorieModal/>

            <UserModal/>

        </div>
    )
}