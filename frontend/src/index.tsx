import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GQLActivity, GQLActivityPageInput } from './graphql';
import { offsetLimitPagination } from '@apollo/client/utilities';

const httpLink = createHttpLink({
	uri: 'http://localhost:4000/',
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('token');

	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

//
const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache({
		typePolicies: {
			Query: {
				fields: {
					getActivityPage: {
						merge(existing: any[], incoming: any[], { args }) {
							const merged = existing ? existing.slice(0) : [];
							// Insert the incoming elements in the right places, according to args.
							const end = args?.offset + Math.min(args?.first, incoming.length);
							for (let i = args?.offset; i < end; ++i) {
								merged[i] = incoming[i - args?.offset];
							}
							return merged;
						},
						read(existing: any[], { args }) {
							if (existing) {
								console.log({ existing });
							}
							const page = existing && existing.slice(args?.offset, args?.offset + args?.first);

							if (page && page.length > 0) {
								console.log(args?.offset + '-->' + (args?.offset + args?.first));
								console.log(page);
								return page;
							}
						},
					},
				},
			},
		},
	}),
});

const notNull = document.getElementById('root');
if (notNull !== null) {
	const root = ReactDOM.createRoot(notNull);
	root.render(
		<React.StrictMode>
			<BrowserRouter>
				<ApolloProvider client={client}>
					<App />
				</ApolloProvider>
			</BrowserRouter>
		</React.StrictMode>
	);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
