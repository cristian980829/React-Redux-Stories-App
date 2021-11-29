import React from "react";
import { useDispatch, useSelector } from 'react-redux';

import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import { Button, MenuItem } from "@material-ui/core";
import { grey } from '@mui/material/colors';
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { ListItemIcon } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { makeStyles } from '@material-ui/core'
import { useHistory, useLocation } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";


import ButtonAppBarCollapse from "./ButtonAppBarCollapse";
import { startLogout } from "../../../actions/auth";
import { startUserSetActive } from '../../../actions/user';
import { uiUserOpenModal, uiModalViewModel } from '../../../actions/ui';
import { UserModal } from "../../user/UserModal";

const styles = theme => ({
    _root: {
    position: "absolute",
    left: 80
  },
  root: {
    position: "absolute",
    right: 0
  },
  buttonBar: {
    [theme.breakpoints.down("xs")]: {
      display: "none"
    },
    margin: "10px",
    paddingLeft: "16px",
    right: 0,
    position: "relative",
    width: "100%",
    background: "transparent"
  }
});


const useStyles = makeStyles(() => {
  return {
    active: {
      background: "#384AA9"
    },
    activeButton: {
      background: "#ECECEC"
    }
  }
});


const AppBarCollapse = props => {

  const { rol } = useSelector( state => state.auth.user );

  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const dispatch = useDispatch();
  
  const handleLogout = () => {
      dispatch( startLogout() );
  }

  const handleOpenInfoModal = () => {
    dispatch( startUserSetActive() );
    dispatch( uiModalViewModel() );
    dispatch( uiUserOpenModal() );
  }

  return(

    <>
    <div className={props.classes._root}>
        <ButtonAppBarCollapse>
          <MenuItem>
              <ListItem 
                button 
                key={'Stories'} 
                onClick={() => history.push('/stories')}
                className={location.pathname === '/stories' ? classes.activeButton : null}
              >
                <ListItemText primary={'Stories'} />
              </ListItem>
              <ListItem 
                button 
                key={'My_Stories'} 
                onClick={() => history.push('/mystories')}
                className={location.pathname === '/mystories' ? classes.activeButton : null}
              >
                <ListItemText primary={'My_Stories'} />
              </ListItem>
              {rol==='ADMIN' && <ListItem 
                button 
                key={'Users'} 
                onClick={() => history.push('/users')}
                className={location.pathname === '/users' ? classes.activeButton : null}
              >
                <ListItemText primary={'users'} />
              </ListItem>}
          </MenuItem>
        </ButtonAppBarCollapse>
        <div className={props.classes.buttonBar} id="appbar-collapse">
        <Button color="inherit">
            <ListItem 
              button 
              key={'Stories'} 
              onClick={() => history.push('/stories')}
              className={location.pathname === '/stories' ? classes.active : null}
            >
              <ListItemText primary={'Stories'} />
            </ListItem>
            <ListItem 
              button 
              key={'My_Stories'} 
              onClick={() => history.push('/mystories')}
              className={location.pathname === '/mystories' ? classes.active : null}
            >
              <ListItemText primary={'My_Stories'} />
            </ListItem>
            {rol==='ADMIN' && <ListItem 
              button 
              key={'Users'} 
              onClick={() => history.push('/users')}
              className={location.pathname === '/users' ? classes.active : null}
            >
              <ListItemText primary={'Users'} />
            </ListItem>}
        </Button>
        </div>
    </div>
    <div className={props.classes.root}>
        <ButtonAppBarCollapse>
          <MenuItem>
          <ListItem 
                button 
                key={'UserInfo'} 
                onClick={handleOpenInfoModal}
            >
              <ListItemText primary={'My info'} />
            </ListItem>
            <ListItem 
                button 
                key={'Logout'} 
                onClick={handleLogout}
            >
              <ListItemText primary={'Logout'} />
              </ListItem>
          </MenuItem>
        </ButtonAppBarCollapse>
        <div className={props.classes.buttonBar} id="appbar-collapse">
        <Button color="inherit">
          <ListItem 
                button 
                key={'UserInfo'} 
                onClick={handleOpenInfoModal}
              >
                <ListItemIcon><AccountCircleTwoToneIcon sx={{ color: grey[50] }}/></ListItemIcon>
            </ListItem>
          <ListItem 
              button 
              key={'Logout'} 
              onClick={handleLogout}
            >
              <ListItemIcon><LogoutIcon sx={{ color: grey[50] }}/></ListItemIcon>
          </ListItem>
        </Button>
        </div>
    </div>

    <UserModal/>
  </>
    )
}

export default withStyles(styles)(AppBarCollapse);
