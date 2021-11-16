import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storieStartLoading } from '../../actions/storie';
import { StorieCard } from './StorieCard';


export const StorieScreen = () => {

    const { stories } = useSelector( state => state.storie );


    const dispatch = useDispatch();

    useEffect(() => {
        
        dispatch( storieStartLoading() );

    }, [ dispatch ])

    return (
        <>
            {
                stories.map( storie => <StorieCard key={storie._id} data={storie} /> )
            }
        </>
    )
}
