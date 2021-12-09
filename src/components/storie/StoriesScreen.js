import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storieStartLoading } from '../../actions/storie';
import { StorieCard } from './StorieCard';

import { StorieModal } from './StorieModal';

import { AddNewFab } from '../ui/fab/AddNewFab';
import { MessageSnack } from '../ui/MessageSnack';

export const StoriesScreen = () => {

    const { stories } = useSelector( state => state.storie );

    const dispatch = useDispatch();

    useEffect(() => {
        
        dispatch( storieStartLoading() );

    }, [ dispatch ])

    return (
        <div className="animate__animated animate__fadeIn">
            {
                stories.map( storie => <StorieCard key={storie._id} data={storie} /> )
            }

            <AddNewFab />

            <StorieModal/>

            <MessageSnack/>

        </div>
    )
}
