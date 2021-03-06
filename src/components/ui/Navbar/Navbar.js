import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBarCollapse from "./AppBarCollapse";

import { useHistory } from 'react-router-dom';
import { Button } from "@material-ui/core";

import ListItem from '@material-ui/core/ListItem'

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  navigation: {},
  toggleDrawer: {},
  appTitle: {
    position: 'absolute',
    width: 150,
    marginLeft: 30
  }
};

function Navbar(props) {
  const { classes } = props;
  const history = useHistory();
  return (
    <AppBar position="relative" className={classes.navigation}>
      <Toolbar>
        <Button color="inherit">
            <ListItem 
              button 
              key={'Main'} 
              onClick={() => history.push('/')}
              className={classes.appTitle}
            >
              <Typography
                variant="h5"
                color="inherit"
              >
                My App
              </Typography>
            </ListItem>
        </Button>
        <AppBarCollapse />
      </Toolbar>
    </AppBar>
  );
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navbar);
