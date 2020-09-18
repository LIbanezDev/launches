import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {AppBar, Button, IconButton, Toolbar, Typography} from '@material-ui/core';
import Link from "next/link";
import Avatar from "@material-ui/core/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));


export default function Header({user, loading}) {

    const classes = useStyles();

    const handleLogout = () => {
        localStorage.removeItem('token')
        window.location = "/"
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    {loading ?
                        <CircularProgress color="secondary"/>
                        :
                        <Avatar variant="rounded" alt="Remy Sharp" src={user ? user.image : '/graph.png'}/>
                    }
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    {user ? "Logged as " + user.name : "OnlyVeg"}
                </Typography>
                <Link href="/">
                    <Button color="inherit"> Index </Button>
                </Link>
                <Link href="/launches">
                    <Button color="inherit"> Launches </Button>
                </Link>
                <Link href="/chat">
                    <Button color="inherit"> Chat </Button>
                </Link>
                {!loading &&
                (user ?
                        (
                            <>
                                <Link href="/products">
                                    <Button color="inherit"> Products </Button>
                                </Link>
                                <Button color="inherit" onClick={handleLogout}> Logout </Button>
                            </>
                        ) : (
                            <Link href="/login">
                                <Button color="inherit"> Login </Button>
                            </Link>
                        )
                )
                }
            </Toolbar>
        </AppBar>
    );
}
