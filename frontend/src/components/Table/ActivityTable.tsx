import React from 'react';
import { format } from '../../utils/utils';
import { BsFillCaretUpFill, BsFillCaretDownFill } from 'react-icons/bs';
import RunMap from '../Map/RunMap';
import { GQLActivity, useGetActivitiesQuery } from '../../graphql';
import { activityType } from '../../utils/constants';

const labels: { [key in keyof activityType]: string } = {
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
	console.log(data);

	const [sort, setSort] = React.useState<{
		keyToSort: keyof Omit<GQLActivity, 'userId' | 'activityId'>;
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

	function handleHeaderClick(key: keyof activityType) {
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
		const keys = (Object.keys(data.getActivities[0]) as (keyof activityType)[]).filter(key => {
			return labels[key];
		});

		return (
			<div className="fixed inset-x-1/4 inset-y-20 overflow-scroll box-content h-screen w-fit">
				<table className=" bg-white m-auto">
					<thead className="bg-grey-300">
						<tr className="">
							{keys.map((key, index) => (
								<th
									key={index}
									className=" border-2 border-grey-500 p-4 font-normal text-gray-900 hover:bg-sky-400"
									onClick={() => handleHeaderClick(key)}>
									<div className="flex">
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
					<tbody className="h-5">
						{getSortedArray().map(activity => (
							<tr key={activity.id} onClick={() => handleRowClick(activity)}>
								{keys.map((key, index) => (
									<td key={index} className="border p-4 text-gray-900">
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
