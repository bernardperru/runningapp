import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
	uri: process.env.REACT_APP_ENDPOINT,
});
//
const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('token');

	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Credentials': true,
		},
	};
});

//
const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache({}),
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

reportWebVitals();
