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