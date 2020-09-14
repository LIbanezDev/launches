import {useMemo} from 'react'
import {ApolloClient, HttpLink, InMemoryCache, split} from '@apollo/client'
import {concatPagination, getMainDefinition} from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws';

const httpLink = new HttpLink({
    uri: 'https://space-x-lv.herokuapp.com/graphql', // Server URL (must be absolute)
    credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
});

const wsLink = process.browser ? new WebSocketLink({ // if you instantiate in the server, the error will be thrown
    uri: `wss://space-x-lv.herokuapp.com/graphql`,
    options: {
        reconnect: true
    }
}) : null;


const link = process.browser ? split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
)  : httpLink;

let apolloClient;

function createApolloClient() {
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
