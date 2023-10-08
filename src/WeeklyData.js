import React from 'react';
import { weekDistanceCumulative } from './funktioner';


function WeeklyData(props) {
   const hash = weekDistanceCumulative(props.activities);

    return (
    <div> {Object.keys(hash).map((key) => 
        {
            return (<p>Week: {key} distance: {(hash[key] / 1000).toFixed(2)} km</p>)
        }
        )}
    </div>)
}


export default WeeklyData;