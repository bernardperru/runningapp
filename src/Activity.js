import React from 'react';
import Stats from './Stats';

function Activity(props) {
    console.log(props)
    return (<Stats 
                elapsedTime={props.activity.elapsed_time}
                movingTime={props.activity.moving_time}
                distance={props.activity.distance}
                >
            </Stats>);
}

export default Activity;


//"moving_time" = seconds
//"distance" = meters
//"cadence" = cadence / 2