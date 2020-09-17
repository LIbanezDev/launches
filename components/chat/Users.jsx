import {makeStyles} from "@material-ui/core/styles";
import React, {useEffect, useState} from "react";
import {gql, useLazyQuery, useQuery, useSubscription} from "@apollo/client";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {ChatWindow} from "./ChatWindow";
import {Avatar, Typography} from "@material-ui/core";
import {useSnackbar} from "notistack";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 500,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
}));

const GET_USERS = gql`
    query GetUsers {
        users {
            id
            name
            age
            createdAtFormated
            email
            image
        }
    }
`

const MESSAGES_SUBSCRIPTION = gql`
    subscription SubMessages{
        newMessage {
            content
            from
            fromData {
                name
                age
                email
                image
            }
        }
    }
`;

const GET_MESSAGES = gql`
    query GetMessages($to: ID!) {
        messages(to: $to) {
            id
            from
            content
            createdAt
            createdAtFormated
            toData {
                id
                image
                name
            }
        }
    }
`

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function Users() {

    const classes = useStyles();
    const {enqueueSnackbar} = useSnackbar();

    const [value, setValue] = React.useState(1);
    const {data, loading} = useQuery(GET_USERS)
    const {data: newMessage, loading: loadingSub} = useSubscription(MESSAGES_SUBSCRIPTION);

    const [getMessages, {data: messages, loading: loadingMessages}] = useLazyQuery(GET_MESSAGES)

    useEffect(() => {
        if (newMessage) {
            const {content, fromData} = newMessage.newMessage
            const {name, age, email, image} = fromData
            enqueueSnackbar(`${name}: ${content}`, {
                variant: "success"
            })
        }
    }, [newMessage])

    if (loading) return <h2> Loading... </h2>

    const handleChange = (event, newValue) => {
        getMessages({
            variables: {
                to: newValue + 1
            }
        })
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                {
                    data?.users.filter(user => user.id !== "2").map((user, index) => {
                        return <Tab key={index} label={user.name} {...a11yProps(index)} />
                    })
                }
            </Tabs>
            {value === -1 && <h2> Seleccione un chat xd </h2>}
            {
                data?.users.map((user, index) => {
                    return (
                        <ChatWindow value={value} index={index} key={index}>
                            {
                                messages && messages.messages.map(msg => {
                                    return (
                                        <Box key={msg.id}>
                                            <Typography>
                                                <Avatar alt="Remy Sharp" src={msg.toData.image}/> {msg.content}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {msg.createdAtFormated}
                                            </Typography>
                                        </Box>)
                                })
                            }
                        </ChatWindow>
                    )
                })
            }
        </div>
    );
}
