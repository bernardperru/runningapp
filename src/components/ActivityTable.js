import React from 'react';
import { prettyDate } from '../funktioner';

function ActivityTable({activities, sortingOption}) {
    let sortedActivities = [...activities];
    const [sortedField, setSortedField] = React.useState(null);
    const {order, setOrder} = React.useState("asc");

    if (sortedField !== null) {
        sortedActivities.sort((a,b) => (a[sortedField] > b[sortedField] ? -1 : 1));
    }

    return (
        <table>
            <thead>
                <tr>
                    <th> 
                        <button type="button" onClick={() => setSortedField('start_date')}>
                            Date
                        </button> 
                    </th>
                    <th> 
                        <button type="button" onClick={() => setSortedField('distance')}>
                            Distance
                        </button> 
                    </th>
                    <th> 
                        <button type="button" onClick={() => setSortedField('average_cadence')}>
                            Cadence
                        </button> 
                    </th>
                    <th> 
                        <button type="button" onClick={() => setSortedField('elapsed_time')}>
                            Time
                        </button> 
                    </th>
                    <th> 
                        <button type="button" onClick={() => setSortedField('average_heartrate')}>
                            Avg. Heartrate
                        </button> 
                    </th>
                </tr>
            </thead>
            <tbody>
                {sortedActivities.map(activity => (
                <tr>
                    <td>{prettyDate(activity['start_date'])}</td>
                    <td>{(activity.distance / 1000).toFixed(2)} km</td>
                    <td>{activity.average_cadence*2}</td>
                    <td>{(activity.elapsed_time / 60).toFixed(2)} min</td>
                    <td>{activity.average_heartrate}</td>
                </tr>
                ))}
            </tbody>
        </table>
  );
}


export default ActivityTable;