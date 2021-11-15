import React from "react";
import { Button, MenuItem } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ButtonAppBarCollapse from "./ButtonAppBarCollapse";
import { NavLink, Link } from 'react-router-dom';

import { useHistory, useLocation } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core'

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
      background: "#384AA9",
    //   active: "transparent"
    }
  }
})

const AppBarCollapse = props => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    return(

    <>
    <div className={props.classes._root}>
        <ButtonAppBarCollapse>
        
        <MenuItem>
            <ListItem 
              button 
              key={'Stories'} 
              onClick={() => history.push('/stories')}
              className={location.pathname === '/stories' ? classes.active : null}
            >
              {/* <ListItemIcon>{item.icon}</ListItemIcon> */}
              <ListItemText primary={'Stories'} />
            </ListItem>
            <ListItem 
              button 
              key={'My_Stories'} 
              onClick={() => history.push('/mystories')}
              className={location.pathname === '/mystories' ? classes.active : null}
            >
              {/* <ListItemIcon>{item.icon}</ListItemIcon> */}
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
              {/* <ListItemIcon>{item.icon}</ListItemIcon> */}
              <ListItemText primary={'Stories'} />
            </ListItem>
            <ListItem 
              button 
              key={'My_Stories'} 
              onClick={() => history.push('/mystories')}
              className={location.pathname === '/mystories' ? classes.active : null}
            >
              {/* <ListItemIcon>{item.icon}</ListItemIcon> */}
              <ListItemText primary={'My_Stories'} />
            </ListItem>
        </Button>
        </div>
    </div>
    <div className={props.classes.root}>
        <ButtonAppBarCollapse>
        <MenuItem>Logout</MenuItem>
        </ButtonAppBarCollapse>
        <div className={props.classes.buttonBar} id="appbar-collapse">
        <Button color="inherit">Logout</Button>
        </div>
    </div>
  </>
    )
}

export default withStyles(styles)(AppBarCollapse);
