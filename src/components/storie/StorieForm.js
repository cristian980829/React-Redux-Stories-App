import React  from 'react';
import moment from 'moment';                        
import { useSelector } from 'react-redux';

import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActions } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ImgList } from './ImageList';
import Dropzone from '../dropzone/Dropzone';


const theme = createTheme();

export const StorieForm = ( { formValues, setFormValues, error } ) => {

    const { description, title, registration_date, user } = formValues;
    
    const date_format = moment(registration_date).format('lll');

    const { modalViewModel } = useSelector( state => state.ui );

    
    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" >
                <CssBaseline />
                <Box
                    sx={{
                    marginTop: 11,
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}
                >
                    {!modalViewModel ?
                        <Box
                            component="form"
                            justifyContent="center"
                        >
                            {
                                error &&
                                (
                                    <Stack sx={{ width: '100%' }} spacing={2}>
                                        <Alert severity="error">{error}</Alert>
                                    </Stack>
                                )
                            } 

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="title"
                                label="Title"
                                type="text"
                                autoComplete="off"
                                value={ title }
                                onChange={ handleInputChange }
                            />

                            <TextField
                                required
                                margin="normal"
                                fullWidth
                                name="description"
                                label="Description"
                                type="text"
                                multiline
                                rows={15}
                                autoComplete="off"
                                value={ description }
                                onChange={ handleInputChange }
                            />
                                        
                            <div className="content">
                                <Dropzone />
                            </div>

                        </Box> 
                
                    : <Box 
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
                                        Author: { user.name }
                                    </Typography>
                                </Box>
                                <Box 
                                    sx={{ mr: 2 }}
                                    display="flex"
                                    width={890}
                                    alignItems="right"
                                    justifyContent="right"
                                >
                                    <Typography variant="caption" color="text.secondary">
                                        Published on { date_format }
                                    </Typography>
                                </Box>
                            </CardActions>


                             <ImgList />



                            <CardActions>
                                <CardContent>
                                    <Typography variant="p">
                                        {description}
                                    </Typography>
                                </CardContent>
                            </CardActions>
                        </Card>
                    </Box> 
                    }
                </Box>
            </Container>
        </ThemeProvider>
    )
}


