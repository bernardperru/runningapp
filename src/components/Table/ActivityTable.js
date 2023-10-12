import React from 'react';
import { prettyDate } from '../../funktioner';
import "./ActivityTable.css";
import { BsFillCaretUpFill, BsFillCaretDownFill } from "react-icons/bs";

function ActivityTable({activities}) {
    const [sort, setSort] = React.useState({keyToSort: "start_date", direction: "asc"});

    function handleHeaderClick(sortOpt) {
        setSort(
        {
            keyToSort: sortOpt,
            direction: 
                sortOpt === sort.keyToSort ? sort.direction === 'asc' ? 'desc' : 'asc' : 'desc',        
        });
    }

    function getSortedArray () {
        if (sort.direction === "asc") {
            return activities.sort((a,b) => (a[sort.keyToSort] > b[sort.keyToSort] ? 1 : -1));
        }
        return activities.sort((a,b) => (a[sort.keyToSort] > b[sort.keyToSort] ? -1 : 1));
    }

    return (
        <table className="center">
            <thead>
                <tr> 
                    <th onClick={() => handleHeaderClick('start_date')}> 
                        <div className="header-container">
                            <span>Date</span> 
                            {
                                sort.keyToSort === "start_date" && (sort.direction === "asc" ? <BsFillCaretUpFill/> : <BsFillCaretDownFill/>)
                            }
                        </div>
                    </th>
                    <th onClick={() => handleHeaderClick('distance')}> 
                        <div className="header-container">
                                <span>Distance</span> 
                                {
                                    sort.keyToSort === "distance" && (sort.direction === "asc" ? <BsFillCaretUpFill/> : <BsFillCaretDownFill/>)
                                }
                        </div>
                    </th>
                    <th onClick={() => handleHeaderClick('average_cadence')}>  
                        <div className="header-container">
                                <span>Avg. Cadence</span> 
                                {
                                    sort.keyToSort === "average_cadence" && (sort.direction === "asc" ? <BsFillCaretUpFill/> : <BsFillCaretDownFill/>)
                                }
                        </div>
                    </th>
                    <th onClick={() => handleHeaderClick('elapsed_time')}> 
                        <div className="header-container">
                                <span>Time</span> 
                                {
                                    sort.keyToSort === "elapsed_time" && (sort.direction === "asc" ? <BsFillCaretUpFill/> : <BsFillCaretDownFill/>)
                                }
                        </div>
                    </th>
                    <th onClick={() => handleHeaderClick('average_heartrate')}> 
                        <div className="header-container">
                                <span>Avg. Heartrate</span> 
                                {
                                    sort.keyToSort === "average_heartrate" && (sort.direction === "asc" ? <BsFillCaretUpFill/> : <BsFillCaretDownFill/>)
                                }
                        </div>
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