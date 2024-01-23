import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage';
import TablePage from './pages/TablePage';
import RedirectPage from './pages/RedirectPage';
import LoginPage from './pages/LoginPage';
import ChartPage from './pages/ChartPage';
import CardPageWeeks from './pages/CardPageWeeks';
import CardPageActivities from './pages/CardPageActivities';
import { INavBarLink } from './components/Navbar/Navbar';
import { ActivityPage } from './pages/ActivityPage';

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
					<Route path="/" element={<Home />} />
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
