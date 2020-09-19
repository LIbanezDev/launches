import React from 'react';
import {useFetchUser} from "../../lib/user";
import Layout from "../../components/Layout";
import ProductsList from "../../components/products/ProductsList";
import Grid from "@material-ui/core/Grid";
import {gql, useQuery} from "@apollo/client";


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

    const {loading, data, refetch} = useQuery(ALL_PRODUCTS_QUERY)

    return (
        <Layout user={user} loading={loadingUser}>
            <Grid container style={{margin:"5px"}}>
                <ProductsList user={user} data={data} loading={loading} refetch={refetch}/>
            </Grid>
        </Layout>
    );
};


export default IndexProducts;
