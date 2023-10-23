import React from 'react';
import { format } from '../../funktioner';
import './ActivityTable.css';
import { BsFillCaretUpFill, BsFillCaretDownFill } from 'react-icons/bs';
import RunMap from '../Map/RunMap';
import { Activity } from '@/Activity';

const labels: { [key in keyof Activity]: string } = {
	average_heartrate: 'Avg. Heartrate',
	average_cadence: 'Avg. Cadence',
	distance: 'Distance',
	elapsed_time: 'Time',
	id: 'Id',
	start_date: 'Date',
	week: 'Week',
	zone: 'Zone',
	map: '',
};

const ActivityTable: React.FunctionComponent<{ activities: Activity[] }> = ({ activities }) => {
	const [sort, setSort] = React.useState<{
		keyToSort: keyof Activity;
		direction: 'asc' | 'desc';
	}>({
		keyToSort: 'start_date',
		direction: 'asc',
	});

	const [currentActivity, setActivity] = React.useState<{
		activity: Activity | null;
		see: boolean;
	}>({
		activity: null,
		see: false,
	});

	function handleHeaderClick(key: keyof Activity) {
		setSort({
			keyToSort: key,
			direction: key === sort.keyToSort ? (sort.direction === 'asc' ? 'desc' : 'asc') : 'desc',
		});
	}

	function handleRowClick(activity: Activity) {
		setActivity({ activity: activity, see: true });
	}

	function handleMapClick() {
		setActivity({ activity: null, see: false });
	}

	function getSortedArray() {
		if (sort.direction === 'asc') {
			return activities.sort((a, b) => (a[sort.keyToSort] > b[sort.keyToSort] ? 1 : -1));
		}
		return activities.sort((a, b) => (a[sort.keyToSort] > b[sort.keyToSort] ? -1 : 1));
	}

	const keys = (Object.keys(activities[0]) as (keyof Activity)[]).filter(key => {
		return labels[key];
	});

	return (
		<div>
			{currentActivity.see == true ? (
				<div>
					<div onClick={() => handleMapClick()}>RETURN KNAP</div>
					{/* <RunMap activity={currentActivity.activity}></RunMap> */}
				</div>
			) : (
				<table className="center">
					<thead>
						<tr>
							{keys.map((key, index) => (
								<th key={index} onClick={() => handleHeaderClick(key)}>
									<div className="header-container">
										<span>{labels[key]}</span>
										{sort.keyToSort === key &&
											(sort.direction === 'asc' ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />)}
									</div>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{getSortedArray().map(activity => (
							<tr key={activity.id} onClick={() => handleRowClick(activity)}>
								{keys.map((key, index) => (
									<td key={index}>
										{format(key, activity[key])}
										{''}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default ActivityTable;
