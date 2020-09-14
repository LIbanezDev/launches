import React from 'react';
import {useFetchUser} from "../../lib/user";
import Layout from "../../components/Layout";
import {initializeApollo} from "../../lib/apolloClient";
import ProductsList, {ALL_PRODUCTS_QUERY} from "../../components/products/ProductsList";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
    container: {
        padding: 5
    },
    pagination: {
        textAlign: 'center'
    }
}))

const IndexProducts = () => {
    const {user, loading} = useFetchUser({required: true})
    const classes = useStyles()

    return (
        <Layout user={user} loading={loading}>
            <Grid container className={classes.container}>
                <ProductsList user={user}/>
            </Grid>
        </Layout>
    );
};

export async function getStaticProps() {

    const apolloClient = initializeApollo()

    await apolloClient.query({
        query: ALL_PRODUCTS_QUERY,
    })

    return {
        props: {
            initialApolloState: apolloClient.cache.extract(),
        },
        revalidate: 1,
    }
}

export default IndexProducts;