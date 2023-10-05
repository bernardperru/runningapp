import React from 'react';



function Stats({elapsedTime, movingTime, distance}) {
    
    return (<span>
        <h1>Elapsed time = {(elapsedTime / 60).toFixed(2)} min</h1>
        <h1>Moving time = {Math.trunc(movingTime / 60).toFixed(2)} min</h1>
        <h1>Distance = {(distance / 1000).toFixed(2)} km</h1>
        <h1>--------------------------------------</h1>
    </span>)
}

export default Stats;