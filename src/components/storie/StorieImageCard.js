import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { storieRemoveOneImage } from '../../actions/storie';

export const StorieImageCard = ( { urlImage } ) => {

    const dispatch = useDispatch();

    const deleteImg = () => {
        dispatch( storieRemoveOneImage(urlImage) );
    }

    return (
        <>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={urlImage} />
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <div className="img-align pointer">
                            <DeleteIcon onClick={deleteImg} />
                        </div>
                    }
                />
                
            </ListItem>
        </>
    )
}