import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom'
import moment from 'moment';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Box } from '@material-ui/core'
import { storieSetActive } from '../../actions/storie';
import { uiOpenModal } from '../../actions/ui';


export const StorieCard = ( {data} ) => {
    const dispatch = useDispatch();
    const { title, description, registration_date, user  } = data;
    const short_description = description.substring(0, 300) + "...";
    const date_format = moment(registration_date).format('lll');
    const location = useLocation();

    const handelEdit = (storie) =>{
        if(location.pathname === '/mystories'){
            dispatch( storieSetActive(storie) );
            dispatch( uiOpenModal() );
        }

    }   
    return (
        <>
            <Box 
                onClick={()=>handelEdit(data)}
                display="flex" 
                justifyContent="center"
            >
                <Card sx={{ maxWidth: 1000 }}>
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {short_description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                        { user.name }
                        </Button>
                    <Box 
                        display="flex" 
                        width={890}
                        alignItems="right"
                        justifyContent="right"
                    >
                    <Typography variant="body2" color="text.secondary">
                        { date_format }
                    </Typography>
                    </Box>
                    </CardActions>
                </Card>
            </Box>
            <Box sx={{ mb: 4 }} />
        </>
    )
}
