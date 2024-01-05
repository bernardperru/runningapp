import React from 'react';
import { format } from '../../utils/utils';
import { BsFillCaretUpFill, BsFillCaretDownFill } from 'react-icons/bs';
import { useGetActivityPageQuery } from '../../graphql';
import { activityType } from '../../utils/constants';
import { usePagination } from '../../hooks/usePagination';

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
	const [sort, setSort] = React.useState<{
		sort: keyof activityType;
		order: 'asc' | 'desc';
	}>({
		sort: 'start_date',
		order: 'desc',
	});

	const { paginationData, Pagination } = usePagination(15);

	const { data } = useGetActivityPageQuery({
		variables: {
			first: paginationData.first,
			offset: paginationData.offset,
			order: sort.order,
			sort: sort.sort,
		},
	});

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
			<Pagination pagesNumber={data.getActivityPage.pages}></Pagination>
		</div>
	);
};

export default ActivityTable;
