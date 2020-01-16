import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { RequestType } from '../src/types/request.type';
import { Response } from 'express';

export default withApollo(
    ({ ctx, headers, initialState }) => {
        const isBrowser = typeof window !== 'undefined';
        let csrfToken = '';
        if(isBrowser) {
            const element =  <HTMLMetaElement>document.head.querySelector('meta[name="csrf-token"]');
            if(element) {
                csrfToken= element.content;
            }
        } else {
            if(ctx && ctx.req && (ctx.req as RequestType).csrfToken) {
                csrfToken = (ctx.req as RequestType).csrfToken();
            }
        }
        return new ApolloClient({
            ssrMode: true,
            cache: new InMemoryCache().restore(initialState || {}),
            link: ApolloLink.from([
                onError(
                    ({ graphQLErrors, networkError }) => {
                        if (graphQLErrors && !isBrowser) {
                            graphQLErrors.map(
                                ({ message, locations, path, }) => {
                                    if (networkError) {
                                        console.log(`[Network error]: ${networkError}`);
                                    }
                                    const response = (message as any);
                                    if(typeof response.statusCode !== typeof undefined && response.statusCode == 401 && ctx && ctx.res) {
                                        (ctx.res as Response).redirect('/login');
                                    }
                                }
                            )
                        }
                    }
                ),
                new HttpLink({
                    uri: (isBrowser) ? '/graphql' : 'http://localhost:' + (process.env.PORT || 3000) + '/graphql',
                    credentials: 'include',  // use 'same-origin' if it is appropriate for your case
                    headers: (ctx && ctx.req && ctx.req.headers.cookie) ? { 'X-CSRF-TOKEN': csrfToken, cookies: ctx.req.headers.cookie } : { 'X-CSRF-TOKEN': csrfToken },
                }),
            ]),
        })
    }
)
