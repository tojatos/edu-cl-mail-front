import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link as RouterLink } from "react-router-dom";
import { logUserOut } from '../../redux/actions/userActions';
import {
    AppBar,
    Button,
    Divider, Drawer,
    IconButton, Link,
    List,
    ListItem,
    ListItemIcon, ListItemText, TextField,
    Toolbar,
    Typography, useTheme
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {makeStyles} from "@material-ui/styles";
import clsx from "clsx";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MailIcon from '@material-ui/icons/Mail';
import DraftsIcon from '@material-ui/icons/Drafts';
import UnarchiveIcon from '@material-ui/icons/Unarchive';
import TrashIcon from '@material-ui/icons/Delete';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
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
    const userReducer = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);

    // close drawer on logout
    !userReducer.loggedIn && open && handleDrawerClose();

    const inboxes = [
        {
            name: 'Odbiorcza',
            icon: <MailIcon/>,
            action: () => alert("test"),
        },
        {
            name: 'Nadawcza',
            icon: <UnarchiveIcon/>,
            action: () => alert("test"),
        },
        {
            name: 'Robocza',
            icon: <DraftsIcon/>,
            action: () => alert("test"),
        },
        {
            name: 'Usunięte',
            icon: <TrashIcon/>,
            action: () => alert("test"),
        },
    ];

    return <div className={classes.root}>
        <AppBar
            position="sticky"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}
        >
            <Toolbar>

                { userReducer.loggedIn ?
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    : null }
                <Typography variant="h6" className={classes.title}>
                    {userReducer.user.login}
                </Typography>
                { userReducer.loggedIn ? <Button color="inherit" onClick={() => dispatch(logUserOut())}>Logout</Button> : <Link color="inherit" component={RouterLink} to="/login">
                    <Button color="inherit">Login</Button>
                </Link>}
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
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </div>
            <Divider />
            <List>
                {
                    inboxes.map(i =>
                        <ListItem button onClick={i.action} key={i.name}>
                            <ListItemIcon>{i.icon}</ListItemIcon>
                            <ListItemText primary={i.name}/>
                        </ListItem>
                    )
                }
            </List>
            <Divider />
            <List>
                <ListItem>
                    <TextField label="Szukaj" />
                </ListItem>
            </List>
        </Drawer>
    </div>;
}

export default Navbar;
