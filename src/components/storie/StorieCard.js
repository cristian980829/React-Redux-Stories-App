import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Box } from '@material-ui/core'
import moment from 'moment';

export const StorieCard = ( {data} ) => {
    const { title, description, registration_date, user  } = data;
    const short_description = description.substring(0, 300) + "...";
    const date_format = moment(registration_date).format('LL');

    return (
        <>
            <Box 
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
