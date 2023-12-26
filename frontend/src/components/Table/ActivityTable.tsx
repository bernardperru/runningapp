import React from 'react';
import { format } from '../../utils/utils';
import { BsFillCaretUpFill, BsFillCaretDownFill } from 'react-icons/bs';
import { useGetActivityPageQuery } from '../../graphql';
import { activityType } from '../../utils/constants';

const labels: { [key in keyof activityType]: string } = {
	start_date: 'Date',
	distance: 'Distance',
	elapsed_time: 'Time',
	average_heartrate: 'Avg. Heartrate',
	average_cadence: 'Avg. Cadence',
	zone: 'Zone',
	average_pace: 'Avg. Pace',
};

const ActivityTable: React.FunctionComponent = () => {
	const [offset, setOffset] = React.useState(0);
	const first = 15;
	const [sort, setSort] = React.useState<{
		sort: keyof activityType;
		order: 'asc' | 'desc';
	}>({
		sort: 'start_date',
		order: 'desc',
	});

	const { data } = useGetActivityPageQuery({
		variables: {
			first,
			offset,
			order: sort.order,
			sort: sort.sort,
		},
	});

	//creates an array containing [1, 2, 3, 4, 5] to represent the different pages
	const pages = Array.from({ length: data?.getActivityPage.pages || 0 }, (_, x) => x + 1);

	function loadNewPage(newPageNumber: number) {
		setOffset(first * (newPageNumber - 1));
	}

	function handleHeaderClick(key: keyof activityType) {
		setSort({
			sort: key,
			order: key === sort.sort ? (sort.order === 'asc' ? 'desc' : 'asc') : 'desc',
		});
	}

	if (!data) {
		return <></>;
	}

	const keys = (Object.keys(data.getActivityPage.activities[0]) as (keyof activityType)[]).filter(key => {
		return labels[key];
	});

	return (
		<div>
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
									{sort.sort === key ? (
										sort.order === 'asc' ? (
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
					{data.getActivityPage.activities.map(activity => (
						<tr key={activity.id}>
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

			<div className="flex justify-center">
				{pages.map((el, index) =>
					data.getActivityPage.currentPage === el ? (
						<button
							key={index}
							onClick={() => {
								loadNewPage(el);
							}}
							className="h-10 px-5 text-indigo-600 transition-colors duration-150 rounded-l-lg focus:shadow-outline bg-indigo-100">
							{el}
						</button>
					) : (
						<button
							key={index}
							onClick={() => {
								loadNewPage(el);
							}}
							className="h-10 px-5 text-indigo-600 transition-colors duration-150 bg-white rounded-l-lg focus:shadow-outline hover:bg-indigo-100">
							{el}
						</button>
					)
				)}
			</div>
		</div>
	);
};

export default ActivityTable;
