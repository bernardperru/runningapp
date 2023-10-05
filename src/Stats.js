import React from 'react';
import './Stats.css';



function Stats({elapsedTime, distance, averageCadence, date, heartRate}) {  
    return (
    <>
        <tr>
            <td>{date}</td>
            <td>{(distance / 1000).toFixed(2)} km</td>
            <td>{averageCadence*2}</td>
            <td>{(elapsedTime / 60).toFixed(2)} min</td>
            <td>{heartRate}</td>
        </tr>
    </>
    )
}

export default Stats;