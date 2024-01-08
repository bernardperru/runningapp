import { NavLink, useNavigate } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';

const activeLink = 'bg-blue-300 text-black px-3 py-2 rounded-md text-sm font-medium';
const inactiveLink = 'text-gray-300 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium';

export interface INavBarLink {
	title: string;
	path: string;
}

interface Props<> {
	data: INavBarLink;
}

function Navbar({ data }: Props) {
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
				<nav className="bg-white dark:bg-gray-800 w-full shadow flex justify-center">
					<div className="">
						<div className="flex items-center justify-between h-16">
							<div className=" flex items-center">
								<a className="flex-shrink-0" href="/">
									<img className="w-8 h-8" src="/icons/running-man.svg" alt="Workflow" />
								</a>
								<div className="hidden md:block">
									<div className="flex items-baseline ml-10 space-x-4">
										<NavLink to="" className={({ isActive }) => (isActive ? activeLink : inactiveLink)}>
											Home
										</NavLink>

										<NavLink to="/activities" className={({ isActive }) => (isActive ? activeLink : inactiveLink)}>
											{' '}
											Activities
										</NavLink>

										<NavLink to="/weekly" className={({ isActive }) => (isActive ? activeLink : inactiveLink)}>
											{' '}
											Weekly
										</NavLink>
										<NavLink to="/charts" className={({ isActive }) => (isActive ? activeLink : inactiveLink)}>
											{' '}
											Charts
										</NavLink>
										<div>
											<button
												className={'text-gray-500 hover:text-blue-800 hover:bg-blue-300'}
												onClick={() => handleLogOut()}>
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
