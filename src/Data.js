
class Data {
    constructor(stravaData) {
        const activities = stravaData;
        const week = new Week(stravaData);
    }
}

function activitiesPerWeek(activities) {
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
    
    return activitiesWithWeek;
}

class Week {
    
    constructor(activities) {
        const weekDistance = activitiesPerWeek(activities)
    }
}

export default Data;