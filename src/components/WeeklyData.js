import React from 'react';
import {useState, useEffect} from 'react';
import { weekDistanceCumulative, average } from '../funktioner';
import AverageStats from './AverageStats';

function WeeklyData(props) {
    const [activities, setActivities] = useState(props.activities)

    const stats = [
        {
            id: 1,
            key: "distance",
            label: "Distance",
            modifier(x) {return (x / 1000).toFixed(2) + ' km'}
        },
        {
            id: 2,
            key: "average_cadence",
            label: "Avg. Cadence",
            modifier(x) {return (x * 2).toFixed(0) + ' spm'}
        },
        {
            id: 3,
            key: "elapsed_time",
            label: "Time",
            modifier(x) {return (x / 60).toFixed(2) + ' min'}
        },
        {
            id: 4,
            key: "average_heartrate",
            label: "Avg. Heartrate",
            modifier(x) {return (x).toFixed(0) + ' bpm'}
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
        <div>  
            {stats.map((stat, index) => (
                <AverageStats key={stat.id} activityStat={stat.label}  averageOfStats={stat.modifier(average(stat.key, props.activities))}></AverageStats>
            ))}
        </div>
    )
}


export default WeeklyData;