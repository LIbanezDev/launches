import React from 'react';
import LaunchesList from "../components/LaunchesList";
import {initializeApollo} from "../lib/apolloClient";
import {ALL_LAUNCHES_QUERY, allLaunchesQueryVar} from "../components/LaunchesList";
import {useFetchUser} from "../lib/user";
import Layout from "../components/Layout";

const Launches = () => {
    const {user, loading} = useFetchUser()

    return (
        <Layout loading={loading} user={user}>
            <LaunchesList/>
            <h3> {JSON.stringify(user, null, 4)}</h3>
        </Layout>
    );
};

export async function getStaticProps() {

    const apolloClient = initializeApollo()

    await apolloClient.query({
        query: ALL_LAUNCHES_QUERY,
        variables: allLaunchesQueryVar,
    })

    const cache = apolloClient.cache.extract()

    return {
        props: {
            initialApolloState: cache,
        },
        revalidate: 1,
    }
}

export default Launches;
