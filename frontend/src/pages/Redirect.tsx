import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAddRefreshTokenMutation } from '../graphql';

function Redirect() {
	const urlParams = new URLSearchParams(window.location.search);
	const code = urlParams.get('code');
	const scope = urlParams.get('scope');

	const [addRefreshToken] = useAddRefreshTokenMutation({
		variables: {
			refreshToken: code ? code : '',
		},
		onCompleted: ({ addRefreshToken }) => {
			localStorage.setItem('hasRefreshToken', addRefreshToken ? addRefreshToken.hasRefreshToken.toString() : 'false');
		},
	});

	if (code !== '' && localStorage.getItem('hasRefreshToken') === 'false') {
		addRefreshToken();
	}

	return <div></div>;
}

export default Redirect;
