import React from 'react';

function Home() {
	const { REACT_APP_CLIENT_ID } = process.env;
	const redirectUrl = 'http://localhost:3000/redirect';
	const scope = 'activity:read_all';

	const handleLogin = () => {
		window.location.href = `http://www.strava.com/oauth/authorize?client_id=${REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${redirectUrl}/exchange_token&approval_prompt=force&scope=${scope}`;
	};

	return (
		<div>
			<h1>{window.location.search}</h1>
			<button onClick={handleLogin}>Connect with Strava</button>
		</div>
	);
}

export default Home;
