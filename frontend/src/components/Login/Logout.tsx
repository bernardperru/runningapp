import { useNavigate } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';

export function Logout() {
	const navigate = useNavigate();
	const client = useApolloClient();

	function handleLogOut() {
		client.clearStore();
		localStorage.clear();
		navigate('/login');
	}

	return (
		<button className={'text-gray-500 hover:text-blue-800 hover:bg-blue-300'} onClick={() => handleLogOut()}>
			Logout
		</button>
	);
}
