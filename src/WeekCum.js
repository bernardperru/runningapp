import React from 'react';



function WeekCum(props) {
    const activities = props.activities;
    
    const activitiesWithWeek = activities.map(activity => {
        const currentDate = new Date(activity['start_date']);
        const startDate = new Date(currentDate.getFullYear(), 0, 1);

        const days = Math.floor((currentDate - startDate) /
        (24 * 60 * 60 * 1000));
 
        const weekNumber = Math.ceil(days / 7);
 
        return {key: weekNumber, val: activity}
    })

    let hash = {};
    
    activitiesWithWeek.map(x => {
        if (hash[x.key] == undefined) {
            hash[x.key] =  [];
        }
        hash[x.key].push(x.val);
    })

    return (
    <div> {Object.keys(hash).map((key) => 
        {
            let x = 0;
            hash[key].map(act => {
                x += act.distance;
            })
            return (<p>Week: {key} distance: {(x / 1000).toFixed(2)} km</p>)
            }
        )}
    </div>)
}


export default WeekCum;