import React from 'react';
import { format } from '../../utils/utils';
import { BsFillCaretUpFill, BsFillCaretDownFill } from 'react-icons/bs';
import { GQLActivity, useGetActivityPageQuery, useGetActivityCountQuery } from '../../graphql';
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

	const { data: data1, loading: loading1 } = useGetActivityCountQuery();

	const { data, loading, fetchMore } = useGetActivityPageQuery({
		variables: {
			first: 15,
			offset: offset,
			order: sort.order,
			sort: sort.sort,
		},
		fetchPolicy: 'cache-and-network',
		notifyOnNetworkStatusChange: true,
	});

	React.useEffect(() => {
		if (data1) {
			setPages({
				pages: Array.from(Array(data1.getActivityCount / offset).keys()).map(x => x + 1),
			});
		}
	}, [data1]);

	function loadNewPage(newPageNumber: number) {
		fetchMore({
			variables: {
				first: 15,
				offset: 15 * (newPageNumber - 1),
				order: sort.order,
				sort: sort.sort,
			},
		}).then(() => {
			setPage(newPageNumber);
			setOffset(15 * (newPageNumber - 1));
		});
	}

	if (loading) {
		return <div>loading...</div>;
	}

	if (data && data1 && pages) {
		return (
			<div>
				{' '}
				<div>
					{data.getActivityPage.map(activity => (
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
					{page < data1.getActivityCount / 15 && (
						<button
							onClick={async () => {
								loadNewPage(page + 1);
							}}
							className="h-10 px-5 text-indigo-600 transition-colors duration-150 bg-white rounded-l-lg focus:shadow-outline hover:bg-indigo-100">
							Next
						</button>
					)}
					{page === data1.getActivityCount / offset && (
						<button className="h-10 px-5 text-indigo-100 bg-white rounded-l-lg">Next</button>
					)}
				</div>{' '}
			</div>
		);
	}
};

export default NewActivityTable;
