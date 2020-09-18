import React from 'react';
import {useFetchUser} from "../../lib/user";
import Layout from "../../components/Layout";
import ProductsList from "../../components/products/ProductsList";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import {initializeApollo} from "../../lib/apolloClient";
import {gql, useQuery} from "@apollo/client";


const useStyles = makeStyles(theme => ({
    container: {
        padding: 5
    },
    pagination: {
        textAlign: 'center'
    }
}))

export const ALL_PRODUCTS_QUERY = gql`
    query getProducts {
        products {
            id
            name
            stock
            price
            image
            createdByName
            createdByImg
            createdAtFormated
            updatedAtFormated
        }
    }
`

const IndexProducts = () => {

    const {user, loading:loadingUser} = useFetchUser({required: true})

    const classes = useStyles()

    const {loading, data, refetch} = useQuery(ALL_PRODUCTS_QUERY)

    return (
        <Layout user={user} loading={loadingUser}>
            <Grid container className={classes.container}>
                <ProductsList user={user} data={data} loading={loading} refetch={refetch}/>
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
            initialApolloState: apolloClient.cache.extract()
        },
        revalidate: 1,
    }
}

export default IndexProducts;
