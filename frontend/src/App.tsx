import { useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import ActivityTable from './components/Table/ActivityTable';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage';
import WeekPage from './components/Stats/SingleWeekView/WeekPage';
import RunMap from './components/Map/RunMap';
import AllWeeksPage from './components/Stats/AllWeeksView/AllWeeksPage';
import LoginPage from './pages/LoginPage';
import Redirect from './pages/Redirect';
function App() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [email, setEmail] = useState('');

	return (
		<div className="App">
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				{/* <Route path="/signup" element={<SignUpPage />} /> */}
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
