import './App.css';
import Navbar from './components/Navbar/Navbar';
import React, { useState, useEffect } from 'react';
import ActivityTable from './components/Table/ActivityTable';
import MonthPage from './components/Stats/MonthView/MonthPage';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import { formatStravaActivities } from './funktioner';
import { Activity, StravaActivity } from './Activity';
import WeekPage from './components/Stats/WeekView/WeekPage';
import RunMap from './components/Map/RunMap';
import LineChart from './components/Chart/ActivityChart';

function App() {
	const [activities, setActivities] = useState<Activity[]>([]);
	//Strava Credentials
	let clientId = process.env.REACT_APP_CLIENT_ID;
	let clientSecret = process.env.REACT_APP_CLIENT_SECRET;

	//Refresh token and call address
	const refreshToken = process.env.REACT_APP_REFRESH_TOKEN;
	const callRefresh = `https://www.strava.com/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`;

	const callActivities = `https://www.strava.com/api/v3/athlete/activities?access_token=`;

	useEffect(() => {
		(async () => {
			try {
				const data = await fetch(callRefresh, { method: 'POST' });
				const json = await data.json();
				const data1 = await fetch(callActivities + json.access_token);
				const json1: StravaActivity[] = await data1.json();
				console.log(json1);
				setActivities(json1.map(formatStravaActivities));
			} catch (error) {
				console.error('Error:', error);
			}
		})();
	}, [callRefresh]);

	return (
		<div className="App">
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/activities" element={<ActivityTable activities={activities} />} />
				{/* shows every week with sums of runs */}
				<Route path="/weekly" element={<MonthPage activities={activities} />} />
				{/* shows every singly activity in a week*/}
				<Route path="/weekly/:weekNumber" element={<WeekPage activities={activities} />} />
				<Route path="/weekly/:weekNumber/:activityId" element={<RunMap activities={activities}></RunMap>} />
			</Routes>
		</div>
	);
}
//
export default App;
//<RunMap activities={activities}></RunMap>
//<LineChart activities={activities} x={"average_heartrate"}></LineChart>
//<ActivityTable activities = {activities} sortingOption = {"distance"}></ActivityTable>
