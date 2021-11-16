import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storieStartLoading } from '../../actions/storie';
import { StorieCard } from './StorieCard';

import { uiOpenModal } from '../../actions/ui';


import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { StorieModal } from './StorieModal';


export const StoriesScreen = () => {

    const { stories } = useSelector( state => state.storie );


    const dispatch = useDispatch();

    useEffect(() => {
        
        dispatch( storieStartLoading() );

    }, [ dispatch ])

    const handleClickNew = () => {
        dispatch( uiOpenModal() );
    }

    return (
        <>
            <Box onClick={ handleClickNew } sx={{ '& > :not(style)': { m: 1 } }}>
                <Fab  color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            </Box>
            {
                stories.map( storie => <StorieCard key={storie._id} data={storie} /> )
            }


            <StorieModal/>

        </>
    )
}
