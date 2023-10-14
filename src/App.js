import './App.css';
import Navbar from './components/Navbar/Navbar';
import React, {useState, useEffect} from 'react';
import ActivityTable from './components/Table/ActivityTable';
import WeeklyData from './components/WeeklyData';
import {Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import LineChart from './components/ActivityChart';

function App() {
  const [activities, setActivities] = useState([])
  //Strava Credentials
  let clientId = process.env.REACT_APP_CLIENT_ID;
  let clientSecret = process.env.REACT_APP_CLIENT_SECRET;

  //Refresh token and call address
  const refreshToken =  process.env.REACT_APP_REFRESH_TOKEN;
  const callRefresh = `https://www.strava.com/oauth/token?client_id=${clientId}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`

  const callActivities = `https://www.strava.com/api/v3/athlete/activities?access_token=`

  useEffect(() => {
    (async () => {
      try {
        const data = await fetch(callRefresh, {method: 'POST'});
        const json = await data.json();
        const data1 = await fetch(callActivities + json.access_token);
        const json1 = await data1.json();
        setActivities(json1);
      } catch (error) {console.error("Error:", error)};
    })();
    
  }, [callRefresh])


  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/activities" element={<ActivityTable activities = {activities} />}/>
        <Route path="/weekly" element={<WeeklyData activities = {activities} />} />
      </Routes>
      <LineChart activities={activities}></LineChart>
    </div>
  )
}

export default App;

//<ActivityTable activities = {activities} sortingOption = {"distance"}></ActivityTable>