import React, { useContext, FunctionComponent } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  IconButton,
} from '@material-ui/core';
import SchoolIcon from '@material-ui/icons/School';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ClassIcon from '@material-ui/icons/Class';
import PersonIcon from '@material-ui/icons/Person';
import TocIcon from '@material-ui/icons/Toc';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { UserContext } from '../../pages/_app';

import { signOut } from '../actions';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column'
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));


type NavbarProps = {
  title: string
};

const Navbar: FunctionComponent<NavbarProps> = (props) => {
  const router = useRouter();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const value = useContext(UserContext);

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(true)}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={() => setOpen(false)}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {value?.isAdmin &&
            <ListItem
              selected={router.pathname.startsWith('/users')}
              button
              onClick={() => { router.push('/users') }}>
              <ListItemIcon><PersonIcon /></ListItemIcon>
              <ListItemText primary={'Користувачі'} />
            </ListItem>
          }
          <ListItem
            button
            onClick={() => { router.push('/students') }}
            selected={router.pathname.startsWith('/students')}
          >
            <ListItemIcon><SchoolIcon /></ListItemIcon>
            <ListItemText primary={'База даних учнів'} />
          </ListItem>
          <ListItem
            button
            onClick={() => { router.push('/classes') }}
            selected={router.pathname.startsWith('/classes')}
          >
            <ListItemIcon><ClassIcon /></ListItemIcon>
            <ListItemText primary={'Класи'} />
          </ListItem>
          <ListItem
            button
            onClick={() => { router.push('/subjects') }}
            selected={router.pathname.startsWith('/subjects')}
          >
            <ListItemIcon><TocIcon /></ListItemIcon>
            <ListItemText primary={'Оцінки'} />
          </ListItem>
          <Divider />
          <ListItem button onClick={() => {
            signOut(() => router.push('/'));
          }}>
            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
            <ListItemText primary={'Вийти'} />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
};

export default Navbar;
