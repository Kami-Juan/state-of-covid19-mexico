import React from 'react';

import {AppBar, Toolbar, Typography, IconButton} from '@material-ui/core';
import {
  Menu as MenuIcon,
  BrightnessHigh as BrightnessHighUIcon,
  GitHub as GitHubIcon,
  Language as LanguageIcon,
} from '@material-ui/icons';
import {makeStyles} from '@material-ui/core/styles';

import Drawer from './Drawer';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="inherit" className={classes.appBar}>
        <Toolbar>
          {false && (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu">
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" color="inherit">
            COVID-19 Dashboard
          </Typography>
          <div className={classes.grow} />
          <IconButton aria-label="show 4 new mails" color="inherit">
            <BrightnessHighUIcon />
          </IconButton>
          <IconButton aria-label="show 17 new notifications" color="inherit">
            <GitHubIcon />
          </IconButton>
          <IconButton aria-label="show 4 new mails" color="inherit">
            <LanguageIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer />
    </div>
  );
};

export default Header;
