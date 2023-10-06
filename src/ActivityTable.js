import React from 'react';
import Stats from './Stats';

function ActivityTable(props) {
    const {activities} = props;
    let sortedProducts = [...activities];

    sortedProducts.sort((a,b) => (a.distance > b.distance ? -1 : 1));

    console.log(sortedProducts);

    return (
        <table>
            <thead>
                <tr>
                    <th> Date </th>
                    <th> Distance </th>
                    <th> Avg. Cadence </th>
                    <th> Time </th>
                    <th> Avg. Heart Rate</th>
                </tr>
            </thead>
            <tbody>
                {activities.map(activity => (
                <tr>
                    <td>{activity.start_date}</td>
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