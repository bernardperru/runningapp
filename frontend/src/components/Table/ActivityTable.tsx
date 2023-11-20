import React from 'react';
import { format } from '../../utils/utils';
import { BsFillCaretUpFill, BsFillCaretDownFill } from 'react-icons/bs';
import { GQLActivity, useGetActivitiesQuery } from '../../graphql';
import { activityType } from '../../utils/constants';

//this is my comment :)

const labels: { [key in keyof activityType]: string } = {
	start_date: 'Date',
	distance: 'Distance',
	elapsed_time: 'Time',
	average_heartrate: 'Avg. Heartrate',
	average_cadence: 'Avg. Cadence',
	zone: 'Zone',
	week: 'Week',
	average_pace: 'Average Pace',
};

const calculateRange = (data: GQLActivity[], rowsPerPage: number) => {
	const range = [];
	const num = Math.ceil(data.length / rowsPerPage);
	let i = 1;
	for (let i = 1; i <= num; i++) {
		range.push(i);
	}
	return range;
};

const sliceData = (data: GQLActivity[], page: number, rowsPerPage: number) => {
	return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
};

const ActivityTable: React.FunctionComponent = () => {
	const { data, loading, error } = useGetActivitiesQuery();
	const [page, setPage] = React.useState<number>(1);
	const [tableRange, setTableRange] = React.useState<number[]>([]);
	const [slice, setSlice] = React.useState<GQLActivity[]>([]);
	let activities = data ? data.getActivities : [];

	const [sort, setSort] = React.useState<{
		keyToSort: keyof activityType;
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

	React.useEffect(() => {
		console.log('inside useEffect');
		const range = calculateRange(activities, 10);
		setTableRange([...range]);

		const slice = sliceData(activities, page, 10);
		setSlice([...slice]);
	}, [data, sort, setTableRange, page, setSlice]);

	React.useEffect(() => {
		if (slice.length < 1 && page !== 1) {
			setPage(page - 1);
		}
	}, [slice, page, setPage]);

	function handleHeaderClick(key: keyof activityType) {
		setSort({
			keyToSort: key,
			direction: key === sort.keyToSort ? (sort.direction === 'asc' ? 'desc' : 'asc') : 'desc',
		});
	}

	function handleRowClick(activity: GQLActivity) {
		setActivity({ activity: activity, see: true });
	}

	function getSortedArray() {
		const sortedData = [...activities];
		if (sort.direction === 'asc') {
			activities = sortedData.sort((a, b) => (a[sort.keyToSort] > b[sort.keyToSort] ? -1 : 1));
			return slice;
		}
		activities = sortedData.sort((a, b) => (a[sort.keyToSort] > b[sort.keyToSort] ? 1 : -1));
		return slice;
	}

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error</div>;
	}

	if (data) {
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
				<div>
					{tableRange.map((el, index) => (
						<button key={index} onClick={() => setPage(el)}>
							{el}
						</button>
					))}
				</div>{' '}
			</div>
		);
	}
};

export default ActivityTable;
