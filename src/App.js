import './App.css';
import React, {useState, useEffect} from 'react';
import Activity from './Activity'

function App() {
  const [activities, setActivities] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  //Strava Credentials
  let clientId = "114612";
  let clientSecret = "63304759e6167a310dcb69df8b78ace7af918ab7";

  //Refresh token and call address
  const refreshToken =  "4e1d867906d392a9cf8a8f26d888c952c8796ee0";
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
    <div>{activities.map((activity) => {
      return <Activity activity = {activity}> </Activity>;
    })}</div>
  );
}

export default App;