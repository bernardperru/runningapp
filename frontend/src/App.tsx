import Navbar from './components/Navbar/Navbar';
import ActivityTable from './components/Table/ActivityTable';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage';
import ActivityCardPage from './pages/ActivityCardPage';
import RunMap from './components/Map/RunMap';
import WeekCardPage from './pages/WeekCardPage';
import Redirect from './pages/Redirect';
import LoginPage from './pages/LoginPage';
import ChartPage from './pages/ChartPage';

function App() {
	return (
		<div className="">
			<Navbar />
			<div>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/redirect/exchange_token" element={<Redirect />} />
					<Route path="/activities" element={<ActivityTable />} />
					<Route path="/weekly" element={<WeekCardPage />} />
					<Route path="/weekly/:yearNumber/:weekNumber" element={<ActivityCardPage />} />
					{/* <Route path="/weekly/:yearNumber/:weekNumber/:activityId" element={<RunMap />} /> */}
					<Route path="/charts" element={<ChartPage />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
