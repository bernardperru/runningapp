import Navbar from './components/Navbar/Navbar';
import ActivityTable from './components/Table/ActivityTable';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage';
import ActivityCardPage from './pages/ActivityCardPage';
import TablePage from './pages/TablePage';
// import WeekCardPage from './pages/WeekCardPage';
import RedirectPage from './pages/RedirectPage';
import LoginPage from './pages/LoginPage';
import ChartPage from './pages/ChartPage';
import CardPage from './pages/CardPage';

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
					<Route path="/weekly" element={<CardPage />} />
					<Route path="/weekly/:yearNumber/:weekNumber" element={<ActivityCardPage />} />
					{/* <Route path="/weekly/:yearNumber/:weekNumber/:activityId" element={<RunMap />} /> */}
					<Route path="/charts" element={<ChartPage />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
