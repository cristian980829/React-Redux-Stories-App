import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link, useParams } from 'react-router-dom'
import moment from 'moment';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActions } from '@mui/material';
import Box from '@mui/material/Box';

import { storieSetActive } from '../../actions/storie';
import { uiModalViewModel, uiStorieOpenModal } from '../../actions/ui';


export const StorieCard = ( {data} ) => {
    const { uid } = useSelector( state => state.auth.user );
    const dispatch = useDispatch();
    const { title, description, registration_date, user  } = data;
    const short_description = description.substring(0, 300) + "...";
    const date_format = moment(registration_date).format('lll');
    const location = useLocation();

    const { userid } =useParams();

    const handelEdit = () => {
        if(location.pathname === '/mystories'){
            dispatch( uiModalViewModel() );
            dispatch( storieSetActive(data) );
            dispatch( uiStorieOpenModal() );
        }else{
            dispatch( uiModalViewModel() );
            dispatch( storieSetActive(data) );
            dispatch( uiStorieOpenModal() );
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
                    <div className="pointer" onClick={handelEdit}>
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
                        <Box sx={{ ml: 2 }}  />
                            {!userid && location.pathname !== '/mystories' && user._id !== uid ? 
                                <Link to={ `./user/${ user._id }/${ user.name }` } className="text-link">
                                    { user.name }
                                </Link>
                                : <span className="text-off-link">{ user.name }</span>
                            }
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
