import React from 'react';
import { Link } from 'react-router-dom'

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';


export const UserCard = ( { data } ) => {

    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={data.urlimage} />
            </ListItemAvatar>
            <ListItemText
                className="text-name-card "
                primary={
                    <Link to={ `./user/${ data.uid }/${ data.name }` } className="text-link">
                        { data.name }
                    </Link>
                }
                
                secondary={
                    <>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {data.email}
                        </Typography>
                        {` - ${data.rol}`}
                    </>
                }
            />
       </ListItem>  
    )
}
