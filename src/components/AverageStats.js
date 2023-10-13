import React from 'react';
import { average } from '../funktioner';

function AverageStats({activityStat, averageOfStats}) {
    return (
        <div key={activityStat}>
            <span>{activityStat} : </span>
            <span>{averageOfStats.toFixed(2)}</span>
        </div>
    )
}

export default AverageStats;