import { GQLActivity, useGetActivityPageQuery, useGetPagesQuery } from '../graphql';
import { Table, IColumnType } from '../components/Table/Table';
import { activityType } from '../utils/constants';
import { usePagination } from '../hooks/usePagination';
import { Card } from '../components/Cards/Card';
import { cardFields } from './CardPageActivities';
import React from 'react';
import RunMap from '../components/Map/RunMap';
import { formatTime } from '../utils/utils';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const columns: IColumnType<GQLActivity>[] = [
	{
		key: 'start_date',
		title: 'Date',
		width: 'w-40',
		render: ({ start_date }) => {
			const date = new Date(start_date);
			return <div className="">{date.toDateString()}</div>;
		},
		renderHeader(column) {
			return <div className="">{column.title}</div>;
		},
	},
	{
		key: 'distance',
		title: 'Distance',
		width: 'w-20',
		render: ({ distance }) => {
			return <div className="">{(distance / 1000).toFixed(2) + ' km'}</div>;
		},
		renderHeader: column => {
			return <div className="">{column.title}</div>;
		},
	},
	{
		key: 'elapsed_time',
		title: 'Time',
		width: 'w-20',
		render: ({ elapsed_time }) => {
			return <div className="">{formatTime(elapsed_time)}</div>;
		},
		renderHeader: column => {
			return <div className="">{column.title}</div>;
		},
	},
	{
		key: 'average_heartrate',
		title: 'Heartrate',
		width: 'w-20',
		render: ({ average_heartrate }) => {
			return <div className="">{average_heartrate.toFixed(0) + ' bpm'}</div>;
		},
		renderHeader: column => {
			return <div className="">{column.title}</div>;
		},
	},
	{
		key: 'average_cadence',
		title: 'Cadence',
		width: 'w-20',
		render: ({ average_cadence }) => {
			return <div className="">{average_cadence.toFixed(0) + ' spm'}</div>;
		},
		renderHeader: column => {
			return <div className="">{column.title}</div>;
		},
	},
	{
		key: 'zone',
		title: 'Zone',
		width: 'w-18',
		render: ({ zone }) => {
			return <div className="">{zone}</div>;
		},
		renderHeader: column => {
			return <div className="">{column.title}</div>;
		},
	},
	{
		key: 'average_pace',
		title: 'Pace',
		width: 'w-18',
		render: ({ average_pace }) => {
			return <div className="">{average_pace}</div>;
		},
		renderHeader: column => {
			return <div className="">{column.title}</div>;
		},
	},
];

export function TablePage() {
	const navigate = useNavigate();
	const [sort, setSort] = React.useState<{
		sort: keyof activityType;
		order: 'asc' | 'desc';
	}>({
		sort: 'start_date',
		order: 'desc',
	});

	const [viewActivity, setViewActivity] = React.useState<GQLActivity | undefined>(undefined);

	const { paginationData, Pagination } = usePagination(10);

	const { data: pages } = useGetPagesQuery({
		variables: {
			first: 10,
		},
	});

	const { data, loading } = useGetActivityPageQuery({
		variables: {
			first: paginationData.first,
			offset: paginationData.offset,
			order: sort.order,
			sort: sort.sort,
		},
	});

	//defines function that occurs when clicking on a tableheader (sorting)
	function headerInteract(column: IColumnType<GQLActivity>) {
		if (column) {
			setSort({
				sort: column.key as keyof activityType,
				order: column.key === sort.sort ? (sort.order === 'asc' ? 'desc' : 'asc') : 'desc',
			});
		}
	}

	function rowInteract(row: GQLActivity) {
		// setViewActivity(row);
		navigate('/activities/' + row.activityId);
	}

	// //shows a map and activity stats when clicking on a table row
	// if (viewActivity) {
	// 	return <Outlet context={viewActivity}></Outlet>;
	// 	// return (
	// 	// 	<>
	// 	// 		<div className="hover:bg-sky-500 " onClick={() => setViewActivity(undefined)}>
	// 	// 			{' '}
	// 	// 			Return{' '}
	// 	// 		</div>
	// 	// 		<div className="flex justify-evenly">
	// 	// 			<Card data={viewActivity} fields={cardFields} interact={() => {}} title={['id' as keyof GQLActivity]}></Card>
	// 	// 			<RunMap activity={viewActivity}></RunMap>
	// 	// 		</div>
	// 	// 	</>
	// 	// );
	// }

	return (
		<div className="py-6">
			<Table
				columns={columns}
				data={data?.getActivityPage.activities}
				headerInteract={headerInteract}
				rowInteract={rowInteract}
				sort={sort}></Table>

			{loading && <div className="h-[560px]" />}
			{pages && (
				<div className="flex justify-center p-2">
					<Pagination pagesNumber={pages.getPages}></Pagination>
				</div>
			)}
		</div>
	);
}
