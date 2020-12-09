import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link as RouterLink } from "react-router-dom";
import { logUserOut } from '../../actions/userActions';
import {AppBar, Button, IconButton, Link, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function Navbar() {
    const userReducer = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {userReducer.user.login}
                    </Typography>
                    { userReducer.loggedIn ? (
                        <Button color="inherit" onClick={() => dispatch(logUserOut())}>Logout</Button>
                    ) : (
                        <Link color="inherit" component={RouterLink} to="/login">
                            <Button color="inherit">Login</Button>
                        </Link>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Navbar;
