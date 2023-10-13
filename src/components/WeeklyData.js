import React from 'react';
import { weekDistanceCumulative, average } from '../funktioner';
import AverageStats from './AverageStats';

function WeeklyData(props) {
    const headers = [
        {
            id: 1,
            key: "distance",
            label: "Distance"
        },
        {
            id: 2,
            key: "average_cadence",
            label: "Avg. Cadence"
        },
        {
            id: 3,
            key: "elapsed_time",
            label: "Time"
        },
        {
            id: 4,
            key: "average_heartrate",
            label: "Avg. Heartrate"
        }
    ]


   const hash = weekDistanceCumulative(props.activities);
   let averageMileage = 0;
    Object.keys(hash).map((key) => {
        averageMileage += hash[key];
   })

   averageMileage = ((averageMileage / Object.keys(hash).length) / 1000).toFixed(2); 
   let goalMileage = (averageMileage / 10);
   goalMileage += parseFloat(averageMileage);

    return (
        <>  
        {headers.map((header, index) => (
            <AverageStats activityStat={header.label}  averageOfStats={average(header.key, props.activities)}></AverageStats>
        ))}
        </>
    )
}


export default WeeklyData;