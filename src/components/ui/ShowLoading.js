import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';

export const ShowLoading = () => {

    const { showLoading:open } = useSelector( state => state.ui );

    return (
        <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
    )
}
