import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { storieStartLoading } from '../../actions/storie';
import { MessageSnack } from '../ui/MessageSnack';
import { StorieCard } from './StorieCard';
import { StorieModal } from './StorieModal';

export const MyStoriesScreen = () => {

    const { stories } = useSelector( state => state.storie );
    const { uid } = useSelector( state => state.auth.user );

    const dispatch = useDispatch();

    useEffect(() => {
        
        dispatch( storieStartLoading() );

    }, [ dispatch ])

    return (
        <div className="animate__animated animate__fadeIn">
            {
                stories.map( storie => (storie.user._id===uid) && <StorieCard key={storie._id} data={storie} /> )
            }
            
            <StorieModal/>

            <MessageSnack/>
        </div>
    )
}
