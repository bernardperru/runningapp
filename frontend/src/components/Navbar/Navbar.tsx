import React from 'react';
// import "./Navbar.css";
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<div>
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
										to="/login"
										className={({ isActive }) =>
											isActive
												? 'bg-blue-300 text-black px-3 py-2 rounded-md text-sm font-medium'
												: 'text-gray-300 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium'
										}>
										Login
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
								</div>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</div>
	);
}

export default Navbar;

{
	/* <Link to="/" classNameName="title">
								Home
							</Link>
							<div
								classNameName="menu"
								onClick={() => {
									setMenuOpen(!menuOpen);
								}}>
								<span></span>
								<span></span>
								<span></span>
							</div>
							<ul classNameName={menuOpen ? 'open' : ''}>
								<li>
									<NavLink to="/activities">activities</NavLink>
								</li>
								<li>
									<NavLink to="/weekly">weekly</NavLink>
								</li>
							</ul> */
}
