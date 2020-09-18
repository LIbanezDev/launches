import React from 'react';
import {useRouter} from "next/router";
import Layout from "../../components/Layout";
import {useFetchUser} from "../../lib/user";
import {gql, useQuery} from "@apollo/client";
import {initializeApollo} from "../../lib/apolloClient";

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
    const {query, isFallback} =  useRouter()
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
                    loading || isFallback ? "Loading..." : JSON.stringify(data, null, 4)
                }
            </pre>
        </Layout>
    );
};

export async function getStaticPaths() {
    const apolloClient = initializeApollo()

    const getProducts = {
        query: gql`
            query { products { id } }`
    }

    const {data:{products}} = await apolloClient.query(getProducts)

    const paths = products.map(({id}) =>  ({params:{id}}))

    return {
        paths,
        fallback: false
    }

}

export async function getStaticProps({params}) {

    const apolloClient = initializeApollo()

    await apolloClient.query({
        query: GET_PRODUCT_BY_ID,
        variables: params
    })

    return {
        props: {
            initialApolloState: apolloClient.cache.extract()
        },
        revalidate: 1,
    }
}

export default ProductId;
