import { ApolloClient, InMemoryCache } from '@apollo/client';

const baseUrl =
    process.env.NODE_ENV === 'production'
        ? 'https://fittrack-api.qodeware.co'
        : 'http://localhost:8000';

const client = new ApolloClient({
    uri: `${baseUrl}/graphql/`,
    cache: new InMemoryCache(),
    defaultOptions: {
        query: {
            fetchPolicy: 'network-only', // this is to make sure all the queries fetch new data and not from cache.
            errorPolicy: 'all',
        },
    },
});

export default client;
