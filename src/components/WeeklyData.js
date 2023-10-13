import React from 'react';
import { weekDistanceCumulative } from '../funktioner';


function WeeklyData(props) {
   const hash = weekDistanceCumulative(props.activities);
   let averageMileage = 0;
    Object.keys(hash).map((key) => {
        averageMileage += hash[key];
   })

   averageMileage = ((averageMileage / Object.keys(hash).length) / 1000).toFixed(2); 
   let goalMileage = (averageMileage / 10);
   goalMileage += parseFloat(averageMileage);
   console.log(hash)
   //        <div>{averageMileage}</div>
  // <div>{goalMileage}</div>
   let i = 0;
    return (
    <>
        <div> {Object.keys(hash).map((key) => 
            {
                 return (<p key={key}> Week: {key} distance: {(hash[key] / 1000).toFixed(2)} km</p>)
            }
            )}
        </div>
    </>
    )
}


export default WeeklyData;