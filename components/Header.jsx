import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, Button, IconButton} from '@material-ui/core';
import Link from "next/link";
import Avatar from "@material-ui/core/Avatar";

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

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <Avatar variant="rounded" alt="Remy Sharp" src={user ? user.image : '/graph.png'}/>
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
                                <Link href="/api/logout">
                                    <Button color="inherit"> Logout </Button>
                                </Link>
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
