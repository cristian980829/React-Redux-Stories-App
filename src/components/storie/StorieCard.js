import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom'
import moment from 'moment';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import Box from '@mui/material/Box';

import { storieSetActive } from '../../actions/storie';
import { uiModalViewModel, uiOpenModal } from '../../actions/ui';


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
        }else{
            dispatch( uiModalViewModel() );
            dispatch( storieSetActive(storie) );
            dispatch( uiOpenModal() );
        }
        
    }   
    return (
        <>
            <Box 
                display="flex" 
                alignItems="left"
                justifyContent="left"
            >
                <Card sx={{ maxWidth: 1000 }}>
                    <div className="pointer" onClick={()=>handelEdit(data)}>
                        <CardActions>
                            <CardContent>
                                <Typography gutterBottom variant="h5" >
                                    {title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {short_description}
                                </Typography>
                            </CardContent>
                        </CardActions>
                    </div>

                    <CardActions>
                        <Button size="small" color="primary">
                            { user.name }
                        </Button>
                        <Box 
                            sx={{ mr: 2 }}
                            display="flex" 
                            width={1000}
                            alignItems="right"
                            justifyContent="right"
                        >
                            <Typography variant="caption" color="text.secondary">
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
