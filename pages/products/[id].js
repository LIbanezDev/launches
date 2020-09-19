import React from 'react';
import {useRouter} from "next/router";
import Layout from "../../components/Layout";
import {useFetchUser} from "../../lib/user";
import {gql, useQuery} from "@apollo/client";

const GET_PRODUCT_BY_ID = gql`
    query GetLaunch($id: ID!){
        product(id: $id) {
            id
            name
            price
            stock
            image
            createdByImg
            createdByName
            createdAt
            updatedAt
            updatedAtFormated
            createdAtFormated
        }
    }
`

const ProductId = () => {
    const {query} =  useRouter()

    const {user, loading:userLoading} = useFetchUser()

    const {data, loading} = useQuery(GET_PRODUCT_BY_ID, {
        variables: {
            id: query.id
        }
    })

    return (
        <Layout user={user} loading={userLoading}>
            <pre style={{fontSize:"2rem"}}>
                {
                    loading ? "Loading..." : JSON.stringify(data, null, 4)
                }
            </pre>
        </Layout>
    );
};

export default ProductId;
