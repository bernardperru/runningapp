import React from 'react';
import './AverageStats.css';

function AverageStats({activityStat, averageOfStats}) {
    return (
        <div className='average-stat-container'>
            <span>{activityStat} : </span>
            <span>{averageOfStats}</span>
        </div>
    )
}

export default AverageStats;