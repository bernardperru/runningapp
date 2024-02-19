import { Route, Routes } from 'react-router-dom';
import { INavBarLink, Navbar } from './components';
import {
	ActivityPage,
	CardPageActivities,
	CardPageWeeks,
	ChartPage,
	HomePage,
	LoginPage,
	RedirectPage,
	TablePage,
} from './pages';

const navbarLinks: INavBarLink[] = [
	{ path: '/', title: 'Home' },
	{ path: '/activities', title: 'Activities' },
	{ path: '/weekly', title: 'Weekly' },
	{ path: '/charts', title: 'Charts' },
];

function App() {
	return (
		<div className="">
			<Navbar links={navbarLinks} />
			<div>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/redirect/exchange_token" element={<RedirectPage />} />
					<Route path="/activities" element={<TablePage />} />
					<Route path="/activities/:activityId" element={<ActivityPage />} />
					<Route path="/weekly" element={<CardPageWeeks />} />
					<Route path="/weekly/:yearNumber/:weekNumber" element={<CardPageActivities />} />
					<Route path="/charts" element={<ChartPage />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
