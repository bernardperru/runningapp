import React from 'react';
import { format } from '../../funktioner';
import './ActivityTable.css';
import { BsFillCaretUpFill, BsFillCaretDownFill } from 'react-icons/bs';
import RunMap from '../Map/RunMap';
import { GQLActivity, useGetActivityQuery } from '../../graphql';

const labels: { [key in keyof GQLActivity]: string } = {
	__typename: 'Activity',
	start_date: 'Date',
	average_heartrate: 'Avg. Heartrate',
	average_cadence: 'Avg. Cadence',
	distance: 'Distance',
	elapsed_time: 'Time',
	id: 'Id',
	map: '',
	zone: 'Zone',
	week: 'Week',
};

const ActivityTable: React.FunctionComponent = () => {
	const { data, loading, error } = useGetActivityQuery({ variables: {} });

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

	function handleHeaderClick(key: keyof Omit<GQLActivity, '__typename'>) {
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
		return (
			<div>
				<table className="center">
					<thead>
						<tr>
							{(Object.keys(data.getActivity[0]) as []).map(
								(key, index) =>
									key !== 'map' &&
									key !== 'id' &&
									key !== '__typename' && (
										<th key={index} onClick={() => handleHeaderClick(key)}>
											<div className="header-container">
												<span>{labels[key]}</span>
												{sort.keyToSort === key &&
													(sort.direction === 'asc' ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />)}
											</div>
										</th>
									)
							)}
						</tr>
					</thead>
					<tbody>
						{getSortedArray().map(activity => (
							<tr key={activity.id} onClick={() => handleRowClick(activity)}>
								{(Object.keys(labels) as []).map(
									(key, index) =>
										key !== 'map' &&
										key !== 'id' && (
											<td key={index}>
												{<div>{activity[key]}</div>}
												{''}
											</td>
										)
								)}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
};

export default ActivityTable;
