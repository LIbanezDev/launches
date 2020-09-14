import React, {useEffect, useState} from 'react';
import Layout from "../components/Layout";
import {useFetchUser} from "../lib/user";
import {gql, useSubscription} from "@apollo/client";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import {Typography} from "@material-ui/core";

const USER_REQUEST_SUBSCRIPTION = gql`
    subscription UserRequested{
        userRequested {
            name
            age
        }
    }
`;

const Subscriptions = () => {
    const {user, loading} = useFetchUser()

    const {data, loading:loadingSub } = useSubscription(USER_REQUEST_SUBSCRIPTION);

    return (
        <Layout user={user} loading={loading}>
            {loadingSub ?
                <Backdrop open={true}>
                    <CircularProgress color="inherit" />
                    <Typography>
                        Waiting requests...
                    </Typography>
                </Backdrop>
                :
                <h2> {JSON.stringify(data, null, 4) }</h2>}
        </Layout>
    );
};

export default Subscriptions;