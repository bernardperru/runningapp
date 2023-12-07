import { NavLink, useNavigate } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';

function Navbar() {
	const navigate = useNavigate();
	const client = useApolloClient();
	const authToken = localStorage.getItem('token');

	function handleLogOut() {
		client.clearStore();
		localStorage.clear();
		navigate('/login');
	}

	return (
		<>
			{authToken && (
				<nav className="bg-white dark:bg-gray-800  shadow ">
					<div className="px-8 mx-auto max-w-7xl">
						<div className="flex items-center justify-between h-16">
							<div className=" flex items-center">
								<a className="flex-shrink-0" href="/">
									<img className="w-8 h-8" src="/icons/running-man.svg" alt="Workflow" />
								</a>
								<div className="hidden md:block">
									<div className="flex items-baseline ml-10 space-x-4">
										<NavLink
											to=""
											className={({ isActive }) =>
												isActive
													? 'bg-blue-300 text-black px-3 py-2 rounded-md text-sm font-medium'
													: 'text-gray-300 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium'
											}>
											Home
										</NavLink>

										<NavLink
											to="/activities"
											className={({ isActive }) =>
												isActive
													? 'bg-blue-300 text-black px-3 py-2 rounded-md text-sm font-medium'
													: 'text-gray-300 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium'
											}>
											{' '}
											Activities
										</NavLink>

										<NavLink
											to="/weekly"
											className={({ isActive }) =>
												isActive
													? 'bg-blue-300 text-black px-3 py-2 rounded-md text-sm font-medium'
													: 'text-gray-300 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium'
											}>
											{' '}
											Weekly
										</NavLink>
										<NavLink
											to="/charts"
											className={({ isActive }) =>
												isActive
													? 'bg-blue-300 text-black px-3 py-2 rounded-md text-sm font-medium'
													: 'text-gray-300 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium'
											}>
											{' '}
											Charts
										</NavLink>

										<div>
											<button className={'text-gray-500 hover:text-blue-800'} onClick={() => handleLogOut()}>
												Logout
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</nav>
			)}
		</>
	);
}

export default Navbar;
