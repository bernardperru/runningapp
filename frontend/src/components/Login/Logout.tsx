import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

export function Logout() {
	const navigate = useNavigate();
	const client = useApolloClient();

	function handleLogOut() {
		client.clearStore();
		localStorage.clear();
		navigate('/login');
	}

	return (
		<div>
			<button className={'text-gray-500 hover:text-blue-800'} onClick={() => handleLogOut()}>
				Logout
			</button>
		</div>
	);
}
