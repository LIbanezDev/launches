import {useMemo} from 'react'
import {ApolloClient, HttpLink, InMemoryCache, split} from '@apollo/client'
import {concatPagination, getMainDefinition} from '@apollo/client/utilities'
import {WebSocketLink} from '@apollo/client/link/ws';
import {setContext} from "@apollo/client/link/context";

// if you instantiate in the server, the error will be thrown
const authLink = process.browser ? setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token || "",
        }
    }
}) : null;

const httpLink = new HttpLink({
    uri: process.env.NODE_ENV === 'production' ?
        'https://space-x-lv.herokuapp.com/graphql' :
        'http://localhost:4000/graphql', // Server URL (must be absolute)
    credentials: 'same-origin',
});

const authHttpLink = authLink ? authLink.concat(httpLink) : httpLink

// https://space-x-lv.herokuapp.com/graphql
// if you instantiate in the server, the error will be thrown
const wsLink = process.browser ? new WebSocketLink({
    uri: process.env.NODE_ENV === 'production' ?
        'wss://space-x-lv.herokuapp.com/graphql' :
        'ws://localhost:4000/graphql',
    options: {
        reconnect: true,
        connectionParams: {
            authorization: localStorage.getItem('token') || ''
        }
    }
}) : null;


const link = process.browser ? split(
    ({query}) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    authHttpLink,
) : authHttpLink;

let apolloClient;

export function createApolloClient() {
    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link,
        cache: new InMemoryCache({
            addTypename: false,
            typePolicies: {
                Query: {
                    fields: {
                        allPosts: concatPagination(),
                    },
                },
            },
        }),
    })
}

export function initializeApollo(initialState = null) {
    const _apolloClient = apolloClient ?? createApolloClient()

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // gets hydrated here
    if (initialState) {
        // Get existing cache, loaded during client side data fetching
        const existingCache = _apolloClient.extract()
        // Restore the cache using the data passed from getStaticProps/getServerSideProps
        // combined with the existing cached data
        _apolloClient.cache.restore({...existingCache, ...initialState})
    }
    // For SSG and SSR always create a new Apollo Client
    if (typeof window === 'undefined') return _apolloClient
    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient

    return _apolloClient
}

export function useApollo(initialState) {
    return useMemo(() => initializeApollo(initialState), [initialState])
}
