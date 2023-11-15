import { useApolloClient } from '@apollo/client';

function Logout() {
	//if there is a current user we want to display a logout button
	//which logs out and clears the cache

	function handleLogOut() {}

	return (
		<div>
			<button onClick={() => useApolloClient().clearStore()}></button>
		</div>
	);
}
