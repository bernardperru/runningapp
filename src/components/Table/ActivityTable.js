import React from 'react';
import { prettyDate } from '../../funktioner';
import "./ActivityTable.css";

function ActivityTable({activities}) {
    let sortedActivities = [...activities];
    const [sortedField, setSortedField] = React.useState(null);
    const {order, setOrder} = React.useState("asc");
    const [sort, setSort] = React.useState({keyToSort: "start_date", direction: "asc"});

    if (sortedField !== null) {
        sortedActivities.sort((a,b) => (a[sortedField] > b[sortedField] ? -1 : 1));
    }

    function handleHeaderClick(sortOpt) {
        console.log(sortOpt);
        setSort(
        {
            keyToSort: sortOpt,
            direction: 
                sortOpt === sort.keyToSort ? sort.direction === 'asc' ? 'desc' : 'asc' : 'desc',        
        });

    }

    function getSortedArray () {
        if (sort.direction === "asc") {
            return sortedActivities.sort((a,b) => (a[sortedField] > b[sortedField] ? 1 : -1));
        }
        return sortedActivities.sort((a,b) => (a[sortedField] > b[sortedField] ? -1 : 1));
    }

    return (
        <table className="center">
            <thead>
                <tr> 
                    <th onClick={() => handleHeaderClick('start_date')}> 
                        Date
                    </th>
                    <th onClick={() => handleHeaderClick('distance')}> 
                       Distance
                    </th>
                    <th onClick={() => handleHeaderClick('average_cadence')}>  
                       Average Cadence
                    </th>
                    <th onClick={() => handleHeaderClick('elapsed_time')}> 
                       Time
                    </th>
                    <th onClick={() => handleHeaderClick('average_heartrate')}> 
                        Avg. Heartrate
                    </th>
                </tr>
            </thead>
            <tbody>
                {getSortedArray().map(activity => (
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