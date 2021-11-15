import React from 'react';
import Typography from '@mui/material/Typography';

export const Copyright = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
        Cristian Morales - {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}