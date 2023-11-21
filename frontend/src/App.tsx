import Navbar from './components/Navbar/Navbar';
import ActivityTable from './components/Table/ActivityTable';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage';
import WeekPage from './pages/WeekPage';
import RunMap from './components/Map/RunMap';
import AllWeeksPage from './pages/AllWeeksPage';
import Redirect from './pages/Redirect';
import LoginPage from './pages/LoginPage';

function App() {
	return (
		<div className="">
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/redirect/exchange_token" element={<Redirect />} />
				<Route path="/activities" element={<ActivityTable />} />
				<Route path="/weekly" element={<AllWeeksPage />} />
				<Route path="/weekly/:weekNumber" element={<WeekPage />} />
				<Route path="/weekly/:weekNumber/:activityId" element={<RunMap />} />
			</Routes>
		</div>
	);
}

export default App;
