import React from "react";
import { useDispatch } from 'react-redux';
import { Button, MenuItem } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ButtonAppBarCollapse from "./ButtonAppBarCollapse";

import { useHistory, useLocation } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core'
import { startLogout } from "../../../actions/auth";

import LogoutIcon from '@mui/icons-material/Logout';
import { ListItemIcon } from "@mui/material";
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import { grey } from '@mui/material/colors';


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


const useStyles = makeStyles((theme) => {
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
        </Button>
        </div>
    </div>
    <div className={props.classes.root}>
        <ButtonAppBarCollapse>
          <MenuItem>
          <ListItem 
                button 
                key={'UserInfo'} 
                onClick={handleLogout}
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
