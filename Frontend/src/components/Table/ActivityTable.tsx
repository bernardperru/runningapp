import React from 'react';
import { format } from '../../funktioner';
import './ActivityTable.css';
import { BsFillCaretUpFill, BsFillCaretDownFill } from 'react-icons/bs';
import RunMap from '../Map/RunMap';
import { GQLActivity, useGetActivityQuery } from '../../graphql';

const labels: { [key in keyof Omit<GQLActivity, '__typename' | 'map' | 'id'>]: string } = {
	start_date: 'Date',
	distance: 'Distance',
	elapsed_time: 'Time',
	average_heartrate: 'Avg. Heartrate',
	average_cadence: 'Avg. Cadence',
	zone: 'Zone',
	week: 'Week',
};

const ActivityTable: React.FunctionComponent = () => {
	const { data, loading, error } = useGetActivityQuery();

	const [sort, setSort] = React.useState<{
		keyToSort: keyof Omit<GQLActivity, ''>;
		direction: 'asc' | 'desc';
	}>({
		keyToSort: 'start_date',
		direction: 'asc',
	});

	const [currentActivity, setActivity] = React.useState<{
		activity: GQLActivity | null;
		see: boolean;
	}>({
		activity: null,
		see: false,
	});

	function handleHeaderClick(key: keyof Omit<GQLActivity, '__typename' | 'map' | 'id'>) {
		setSort({
			keyToSort: key,
			direction: key === sort.keyToSort ? (sort.direction === 'asc' ? 'desc' : 'asc') : 'desc',
		});
	}

	function handleRowClick(activity: GQLActivity) {
		setActivity({ activity: activity, see: true });
	}

	function handleMapClick() {
		setActivity({ activity: null, see: false });
	}

	function getSortedArray() {
		if (data !== undefined) {
			const sortedData = [...data?.getActivity];
			if (sort.direction == 'asc') {
				return sortedData.sort((a, b) => a && b && (a[sort.keyToSort] > b[sort.keyToSort] ? -1 : 1));
			}
			return sortedData.sort((a, b) => a && b && (a['start_date'] > b['start_date'] ? 1 : -1));
		}
		return [];
	}

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error</div>;
	}

	if (data !== undefined) {
		const keys = (Object.keys(data.getActivity[0]) as (keyof Omit<GQLActivity, '__typename' | 'map' | 'id'>)[]).filter(
			key => {
				return labels[key];
			}
		);
		console.log(keys);
		return (
			<div>
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
										<div>{format(key, activity[key])}</div>
										{''}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
};

export default ActivityTable;
