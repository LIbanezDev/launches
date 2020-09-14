import {gql, NetworkStatus, useQuery} from '@apollo/client'
import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import {Divider, List, ListItem, ListItemAvatar, ListItemText, Typography} from '@material-ui/core';
import {Container} from "next/app";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));

export const ALL_LAUNCHES_QUERY = gql`
    query getLaunches($pageSize: Int!){
        launches(pageSize: $pageSize) {
            hasMore
            launches {
                id
                site
                mission {
                    missionPatch
                    name
                }
                rocket {
                    name
                }
            }
        }
    }
`

export const allLaunchesQueryVar = {
    pageSize: 40,
}

export default function LaunchList() {
    const classes = useStyles();

    const {loading, error, data, fetchMore, networkStatus} = useQuery(
        ALL_LAUNCHES_QUERY,
        {
            variables: allLaunchesQueryVar,
            // Setting this value to true will make the component rerender when
            // the "networkStatus" changes, so we are able to know if it is fetching
            // more data
            notifyOnNetworkStatusChange: true,
        }
    )

    const loadingMoreLaunches = networkStatus === NetworkStatus.fetchMore

    if (loading && !loadingMoreLaunches) return <div>Loading</div>

    const {launches} = data.launches

    return (
        <Container spacing={2}>
            <List className={classes.root}>
                {launches.map((launch, index) => (
                    <React.Fragment key={launch.id}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src={launch.mission.missionPatch}/>
                            </ListItemAvatar>
                            <ListItemText
                                primary={launch.mission.name}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                            {launch.rocket.name}
                                        </Typography>
                                        {" — I'll be in your neighborhood doing errands this…"}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li"/>
                    </React.Fragment>
                ))}
            </List>
        </Container>

    )
}