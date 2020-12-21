import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Toolbar,
  useTheme,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MailIcon from "@material-ui/icons/Mail";
import DraftsIcon from "@material-ui/icons/Drafts";
import UnarchiveIcon from "@material-ui/icons/Unarchive";
import TrashIcon from "@material-ui/icons/Delete";
import { logoutUser } from "../../redux/slices/userSlice";
import { setCurrentInbox } from "../../redux/slices/mailsSlice";
import { INBOX_ID_TO_NAME, INBOXES } from "../../shared";
import {
  setEndDate,
  setSearchText,
  setStartDate,
} from "../../redux/slices/mailFilterSlice";
import { DatePicker } from "@material-ui/pickers";
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  title: {
    flexGrow: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

function Navbar() {
  const userData = useSelector((state) => state.userData);
  const mailData = useSelector((state) => state.mailData);
  const mailFilterData = useSelector((state) => state.mailFilterData);
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const location = useLocation();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  // close drawer on logout
  !userData.loggedIn && open && handleDrawerClose();

  const inboxes = [
    {
      id: INBOXES.ODBIORCZA,
      icon: <MailIcon />,
      action: () => dispatch(setCurrentInbox(INBOXES.ODBIORCZA)),
    },
    {
      id: INBOXES.NADAWCZA,
      icon: <UnarchiveIcon />,
      action: () => dispatch(setCurrentInbox(INBOXES.NADAWCZA)),
    },
    {
      id: INBOXES.ROBOCZA,
      icon: <DraftsIcon />,
      action: () => dispatch(setCurrentInbox(INBOXES.ROBOCZA)),
    },
    {
      id: INBOXES.USUNIETE,
      icon: <TrashIcon />,
      action: () => dispatch(setCurrentInbox(INBOXES.USUNIETE)),
    },
  ];

  return (
    <div className={classes.root}>
      <AppBar
        position="sticky"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          {userData.loggedIn ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          ) : null}
          <Box className={classes.title}>
            {userData.user.login && !open && (
              <Chip color="secondary" label={userData.user.login} />
            )}
          </Box>
          {userData.loggedIn ? (
            <Button color="inherit" onClick={() => dispatch(logoutUser())}>
              Logout
            </Button>
          ) : location.pathname !== "/login" ? (
            <Link color="inherit" component={RouterLink} to="/login">
              <Button color="inherit">Login</Button>
            </Link>
          ) : null}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {inboxes.map((i) => (
            <ListItem
              button
              onClick={i.action}
              key={i.id}
              selected={mailData.currentInbox === i.id}
            >
              <ListItemIcon>{i.icon}</ListItemIcon>
              <ListItemText primary={INBOX_ID_TO_NAME[i.id]} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem>
            <TextField
              label="Szukaj w tytule / treści"
              onChange={(event) => dispatch(setSearchText(event.target.value))}
              value={mailFilterData.searchText}
            />
          </ListItem>
          <ListItem>
            <DatePicker
              clearable
              label="Wyświetl od"
              value={mailFilterData.startDate}
              onChange={(newValue) =>
                dispatch(setStartDate(newValue?.valueOf() || null))
              }
            />
          </ListItem>
          <ListItem>
            <DatePicker
              clearable
              label="Wyświetl do"
              value={mailFilterData.endDate}
              onChange={(newValue) =>
                dispatch(setEndDate(newValue?.valueOf() || null))
              }
            />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}

export default Navbar;
