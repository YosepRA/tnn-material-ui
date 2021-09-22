import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Appbar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import SubjectOutlined from '@material-ui/icons/SubjectOutlined';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import { format } from 'date-fns';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  page: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f9f9f9',
    paddingTop: theme.spacing(3),
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    backgroundColor: theme.palette.primary,
  },
  date: {
    flex: '1',
  },
  avatar: {
    marginRight: theme.spacing(1),
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  active: {
    backgroundColor: '#f3f3f3',
  },
  title: {
    padding: theme.spacing(2),
  },
  toolbar: theme.mixins.toolbar,
}));

export default function Layout({ children }) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const menuItems = [
    {
      text: 'Notes',
      icon: <SubjectOutlined color="secondary" />,
      path: '/',
    },
    {
      text: 'Create Note',
      icon: <AddCircleOutline color="secondary" />,
      path: '/create',
    },
  ];

  return (
    <div className={classes.root}>
      {/* App bar */}
      <Appbar className={classes.appBar} elevation={0}>
        <Toolbar>
          <Typography className={classes.date}>
            Today is {format(new Date(), 'EEEE, MMMM d, yyyy')}
          </Typography>

          <Avatar src="/avatar.png" className={classes.avatar} />
          <Typography>Yosep</Typography>
        </Toolbar>
      </Appbar>

      {/* Side drawer */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <Typography variant="h5" className={classes.title}>
            Noteify
          </Typography>
        </div>

        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              button
              onClick={() => history.push(item.path)}
              className={
                location.pathname === item.path ? classes.active : null
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Page content */}
      <div className={classes.page}>
        <div className={classes.toolbar} />
        {children}
      </div>
    </div>
  );
}
