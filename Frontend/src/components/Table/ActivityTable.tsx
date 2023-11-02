import React from 'react';
import { format } from '../../functions';
import { BsFillCaretUpFill, BsFillCaretDownFill } from 'react-icons/bs';
import RunMap from '../Map/RunMap';
import { GQLActivity, useGetActivitiesQuery } from '../../graphql';

const labels: { [key in keyof Omit<GQLActivity, '__typename' | 'summary_polyline' | 'id'>]: string } = {
	start_date: 'Date',
	distance: 'Distance',
	elapsed_time: 'Time',
	average_heartrate: 'Avg. Heartrate',
	average_cadence: 'Avg. Cadence',
	zone: 'Zone',
	week: 'Week',
};

const ActivityTable: React.FunctionComponent = () => {
	const { data, loading, error } = useGetActivitiesQuery();

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
			const sortedData = [...data?.getActivities];
			if (sort.direction == 'asc') {
				return sortedData.sort((a, b) => (a[sort.keyToSort] > b[sort.keyToSort] ? -1 : 1));
			}
			return sortedData.sort((a, b) => (a[sort.keyToSort] > b[sort.keyToSort] ? 1 : -1));
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
		const keys = (
			Object.keys(data.getActivities[0]) as (keyof Omit<GQLActivity, '__typename' | 'summary_polyline' | 'id'>)[]
		).filter(key => {
			return labels[key];
		});
		console.log(keys);
		return (
			<div>
				<table className="table p-4 bg-white rounded-lg shadow m-auto">
					<thead>
						<tr>
							{keys.map((key, index) => (
								<th key={index} className="" onClick={() => handleHeaderClick(key)}>
									<div className="border p-4 dark:border-dark-5 whitespace-nowrap font-normal flex text-gray-900 hover:bg-sky-400">
										<span>{labels[key]}</span>
										{sort.keyToSort === key ? (
											sort.direction === 'asc' ? (
												<BsFillCaretUpFill />
											) : (
												<BsFillCaretDownFill />
											)
										) : (
											<div className="px-2"></div>
										)}
									</div>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{getSortedArray().map(activity => (
							<tr key={activity.id} onClick={() => handleRowClick(activity)} className="text-gray-700">
								{keys.map((key, index) => (
									<td key={index} className="border p-4">
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
