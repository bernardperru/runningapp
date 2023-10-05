import React from 'react';
import Stats from './Stats';
import './Activity.css';




function Activity(props) {
    console.log(props)
    return (
            <Stats 
                elapsedTime={props.activity.elapsed_time}
                movingTime={props.activity.moving_time}
                distance={props.activity.distance}
                averageCadence={props.activity.average_cadence}
                date={props.activity.start_date}
                heartRate={props.activity.average_heartrate}
                >
            </Stats>
            );
}

export default Activity;
