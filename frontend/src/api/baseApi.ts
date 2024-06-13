import { DefaultContext, ErrorPolicy, FetchPolicy, TypedDocumentNode } from '@apollo/client';
import client from './graphql';

type Variables = {
    [key: string]: any;
};

interface QueryOptions {
    canonizeResults?: boolean;
    context?: DefaultContext;
    errorPolicy?: ErrorPolicy;
    fetchPolicy?: FetchPolicy;
    notifyOnNetworkStatusChange?: boolean;
    partialRefetch?: boolean;
    pollInterval?: number;
    returnPartialData?: boolean;
}

class BaseApi {
    async query(graphqlQuery: TypedDocumentNode, variables?: Variables, options?: QueryOptions) {
        try {
            return await client.query({
                query: graphqlQuery,
                variables,
                ...options,
            });
        } catch (error: unknown) {
            throw new Error((error as Error).message);
        }
    }

    async mutate(graphqlMutation: TypedDocumentNode, variables?: Variables) {
        try {
            return await client.mutate({
                mutation: graphqlMutation,
                variables,
            });
        } catch (error: unknown) {
            throw new Error((error as Error).message);
        }
    }
}

export default BaseApi;
