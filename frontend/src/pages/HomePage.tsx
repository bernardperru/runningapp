import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useUpdateActivitiesQuery } from '../graphql';

function Home() {
	const { data } = useUpdateActivitiesQuery();

	const navigate = useNavigate();
	const { REACT_APP_CLIENT_ID } = process.env;
	const redirectUrl = 'http://localhost:3000/redirect';
	const scope = 'activity:read_all';
	const connectedToStrava = localStorage.getItem('hasRefreshToken');

	const handleRefreshToken = () => {
		window.location.href = `http://www.strava.com/oauth/authorize?client_id=${REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${redirectUrl}/exchange_token&approval_prompt=force&scope=${scope}`;
	};

	useEffect(() => {
		if (!localStorage.getItem('token')) {
			navigate('/login');
		}
	});

	return (
		<div>
			{connectedToStrava === null ||
				(connectedToStrava === 'false' && (
					<button onClick={handleRefreshToken}> you aren't connected to a strava account</button>
				))}

			{data && <div>fetched {data.updateActivities} new activities</div>}
		</div>
	);
}

export default Home;
