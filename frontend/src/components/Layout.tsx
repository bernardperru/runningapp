import { Outlet } from 'react-router-dom';
import { INavBarLink, Navbar } from './Navbar';

const navbarLinks: INavBarLink[] = [
	{ path: '/', title: 'Home' },
	{ path: '/activities', title: 'Activities' },
	{ path: '/weekly', title: 'Weekly' },
	{ path: '/charts', title: 'Charts' },
];

export function Layout() {
	return (
		<>
			<Navbar links={navbarLinks}></Navbar>
			<Outlet />
		</>
	);
}
