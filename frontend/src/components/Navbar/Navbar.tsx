import { NavLink, useNavigate } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';

const activeLink = 'bg-blue-300 text-black px-3 py-2 rounded-md text-sm font-medium';
const inactiveLink = 'text-gray-300 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium';

export interface INavBarLink {
	title: string;
	path: string;
}

interface Props {
	links: INavBarLink[];
}

function Navbar({ links }: Props) {
	const navigate = useNavigate();
	const client = useApolloClient();
	const authToken = localStorage.getItem('token');

	function handleLogOut() {
		client.clearStore();
		localStorage.clear();
		navigate('/login');
	}

	if (!authToken) {
		return <></>;
	}

	return (
		<nav className="bg-white dark:bg-gray-800 w-full shadow flex items-center justify-center h-16">
			<a className="flex-shrink-0" href="/">
				<img className="w-8 h-8" src="/icons/running-man.svg" alt="Workflow" />
			</a>
			<div className="hidden md:block">
				<div className="flex items-baseline ml-10 space-x-4 ">
					{links.map(link => (
						<NavLink to={link.path} className={({ isActive }) => (isActive ? activeLink : inactiveLink)}>
							{link.title}
						</NavLink>
					))}
					<button className={'text-gray-500 hover:text-blue-800 hover:bg-blue-300'} onClick={() => handleLogOut()}>
						Logout
					</button>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
