import React from 'react';
import { useDispatch } from 'react-redux';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { startUserSetActive } from '../../actions/user';
import { uiUserOpenModal, uiModalViewModel } from '../../actions/ui';

export const UserCard = ( { data } ) => {

    const dispatch = useDispatch();

     const handleViewProfile = () => {
        dispatch( startUserSetActive(data._id) );
        dispatch( uiModalViewModel() );
        dispatch( uiUserOpenModal() );
    }

    return (
        <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar 
                    onClick={handleViewProfile}
                    className="pointer"
                >
                    <Avatar alt="Remy Sharp" src={data.urlimage} />
                </ListItemAvatar>
                <ListItemText
                    onClick={handleViewProfile}
                    className="text-name-card pointer"
                    primary={data.name}
                    secondary={
                    <React.Fragment>
                    <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                    >
                        {data.email}
                    </Typography>
                    {` - ${data.rol}`}
                    </React.Fragment>
                }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </List>
    )
}
