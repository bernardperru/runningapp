export function weekDistanceCumulative(activities) {
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
            hash[x.key] =  0;
        }
        hash[x.key] = hash[x.key] + x.val['distance'];
    })
    
    return hash;
}

export function prettyDate(start_date) {
    const date = new Date(start_date);
    
    return date.getDate() + '-' + (parseInt(date.getMonth())+1) + '-' + date.getFullYear();
} 


export function addZones(activities) {
    activities.map(activity => {
        Object.assign(activity, Zone(activity['average_heartrate']))
    })
}

function Zone(heartRate) {
    console.log(heartRate)
    if (98 <= heartRate && heartRate <= 116) {
        return {zone: 1};
    }
    else if (117 <= heartRate  && heartRate <= 136) {
        return {zone: 2};
    }
    else if (137 <= heartRate  && heartRate <= 155) {
        return {zone: 3};
    }
    else if (156 <= heartRate  && heartRate <= 175) {
        return {zone: 4};
    }
    else if (175 < heartRate) {
        return {zone: 5};
    }
}