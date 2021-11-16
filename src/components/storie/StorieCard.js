import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Box } from '@material-ui/core'

export const StorieCard = () => {
    let str = "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica Lorem ipsum dolor  sit amet consectetur adipisicing elit. Quod provident doloremque cum ipsa  voluptatum hic dignissimos magni ipsam quia. Nulla quo quia iste, iure blanditiis error nihil natus laborum quod!";
    let res = str.substring(0, 300);
    let final = res +"...";
    return (
        <Card sx={{ maxWidth: 1000 }}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Titulo
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {final}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                Cristian Morales
                </Button>
            <Box 
                display="flex" 
                width={675}
                alignItems="right"
                justifyContent="right"
            >
            <Typography variant="body2" color="text.secondary">
                12/08/2021
            </Typography>
            </Box>
            </CardActions>
        </Card>
    )
}
