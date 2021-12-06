import React from 'react';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import { CardActions } from '@mui/material';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';


export const UserFormInfo = () => {

    const { email, name, urlimage, rol } = useSelector( state => state.user.activeUser );

    return (
        <Box 
            className="animate__animated animate__fadeIn "
            display="flex" 
            justifyContent="center"
        >
            <Card sx={{ maxWidth: 1000 }}>
                <div>
                    <img
                        src={`${urlimage}`}
                        alt={name}
                        className="img-register"
                    />
                </div>
                <CardActions>
                    <Box
                        sx={{ ml: 2 }}
                        display="flex" 
                        width={890}
                        alignItems="left"
                        justifyContent="left"
                    >
                        <Typography variant="body1" color="text.secondary">
                            Email: { email }
                        </Typography>
                    </Box>
                </CardActions>

                <CardActions>
                    <Box
                        sx={{ ml: 2 }}
                        display="flex" 
                        width={890}
                        alignItems="left"
                        justifyContent="left"
                    >
                        <Typography variant="body1" color="text.secondary">
                            Name: { name }
                        </Typography>
                    </Box>
                </CardActions>

                <CardActions>
                    <Box
                        sx={{ ml: 2 }}
                        display="flex" 
                        width={890}
                        alignItems="left"
                        justifyContent="left"
                    >
                        <Typography variant="body1" color="text.secondary">
                            Rol: { rol }
                        </Typography>
                    </Box>
                </CardActions>

                <CardActions>
                    <Box
                        sx={{ ml: 2 }}
                        display="flex" 
                        width={890}
                        alignItems="left"
                        justifyContent="left"
                    >
                    </Box>
                </CardActions>
            </Card>
        </Box> 
    )
}
