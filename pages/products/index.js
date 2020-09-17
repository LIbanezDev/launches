import React from 'react';
import {useFetchUser} from "../../lib/user";
import Layout from "../../components/Layout";
import {initializeApollo} from "../../lib/apolloClient";
import ProductsList, {ALL_PRODUCTS_QUERY} from "../../components/products/ProductsList";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import PaginationComponent from "../../components/PaginationComponent";


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

export default IndexProducts;
