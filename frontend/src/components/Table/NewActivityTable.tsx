import React from 'react';
import { format } from '../../utils/utils';
import { BsFillCaretUpFill, BsFillCaretDownFill } from 'react-icons/bs';
import { GQLActivity, useGetActivityPageQuery } from '../../graphql';
import { activityType } from '../../utils/constants';
import { NetworkStatus } from '@apollo/client';
import { off } from 'process';

const labels: { [key in keyof activityType]: string } = {
	start_date: 'Date',
	distance: 'Distance',
	elapsed_time: 'Time',
	average_heartrate: 'Avg. Heartrate',
	average_cadence: 'Avg. Cadence',
	zone: 'Zone',
	average_pace: 'Avg. Pace',
};

const NewActivityTable: React.FunctionComponent = () => {
	const [offset, setOffset] = React.useState(15);
	const [page, setPage] = React.useState(0);
	const [pages, setPages] = React.useState<{ pages: Array<number> }>();
	const [sort, setSort] = React.useState<{
		sort: keyof activityType;
		order: 'asc' | 'desc';
	}>({
		sort: 'start_date',
		order: 'desc',
	});

	const { data, loading, fetchMore } = useGetActivityPageQuery({
		variables: {
			first: 15,
			offset: offset,
			order: sort.order,
			sort: sort.sort,
		},
		fetchPolicy: 'cache-and-network',
	});

	React.useEffect(() => {
		if (data) {
			setPages({
				pages: Array.from(Array(data.getActivityPage.count / offset).keys()).map(x => x + 1),
			});
		}
	}, [data]);

	function loadNewPage(newPageNumber: number) {
		setPage(newPageNumber);
		fetchMore({
			variables: {
				first: 15,
				offset: offset * (newPageNumber - 1),
				order: sort.order,
				sort: sort.sort,
			},
		});
	}

	//make useState to capture current page, sort, and order (asc / desc)

	if (loading) return 'Loading...';

	if (data && pages) {
		return (
			<div>
				{' '}
				<div>
					{data.getActivityPage.activities.map(activity => (
						<div>{activity.start_date}</div>
					))}
				</div>
				<div className="flex justify-center">
					{page > 1 && (
						<button
							onClick={() => {
								loadNewPage(page - 1);
							}}
							className="h-10 px-5 text-indigo-600 transition-colors duration-150 bg-white rounded-l-lg focus:shadow-outline hover:bg-indigo-100">
							Previous
						</button>
					)}
					{page === 1 && <button className="h-10 px-5 text-indigo-100  bg-white rounded-l-lg">Previous</button>}
					{pages.pages.map((el, index) =>
						page === el ? (
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
					{page < data.getActivityPage.count / offset && (
						<button
							onClick={async () => {
								loadNewPage(page + 1);
							}}
							className="h-10 px-5 text-indigo-600 transition-colors duration-150 bg-white rounded-l-lg focus:shadow-outline hover:bg-indigo-100">
							Next
						</button>
					)}
					{page === data.getActivityPage.count / offset && (
						<button className="h-10 px-5 text-indigo-100 bg-white rounded-l-lg">Next</button>
					)}
				</div>{' '}
			</div>
		);
	}
};

export default NewActivityTable;
