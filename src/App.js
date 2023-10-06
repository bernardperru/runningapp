import './App.css';
import React, {useState, useEffect} from 'react';
import ActivityTable from './ActivityTable';

function App() {
  const [activities, setActivities] = useState([])
  const [isLoading, setIsLoading] = useState(true)
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
    <ActivityTable activities = {activities}></ActivityTable>
  )
}

export default App;