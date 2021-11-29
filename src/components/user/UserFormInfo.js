import React from 'react';

import Box from '@mui/material/Box';
import { CardActions } from '@mui/material';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';


export const UserFormInfo = ( {formValues} ) => {

    const { email, name, urlimage, rol } = formValues;

    return (
        <Box 
            display="flex" 
            justifyContent="center"
        >
            <Card sx={{ maxWidth: 1000 }}>
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
                        <Typography variant="body1" color="text.secondary">
                            
                            <img
                                src={`${urlimage}`}
                                alt={name}
                                className="img"
                            />
                        </Typography>
                    </Box>
                </CardActions>
            </Card>
        </Box> 
    )
}
