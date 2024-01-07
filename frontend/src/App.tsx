import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage';
import TablePage from './pages/TablePage';
// import WeekCardPage from './pages/WeekCardPage';
import RedirectPage from './pages/RedirectPage';
import LoginPage from './pages/LoginPage';
import ChartPage from './pages/ChartPage';
import CardPageWeeks from './pages/CardPageWeeks';
import CardPageActivities from './pages/CardPageActivities';

function App() {
	return (
		<div className="">
			<Navbar />
			<div>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/redirect/exchange_token" element={<RedirectPage />} />
					<Route path="/activities" element={<TablePage />} />
					<Route path="/weekly" element={<CardPageWeeks />} />
					<Route path="/weekly/:yearNumber/:weekNumber" element={<CardPageActivities />} />
					{/* <Route path="/weekly/:yearNumber/:weekNumber/:activityId" element={<RunMap />} /> */}
					<Route path="/charts" element={<ChartPage />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
