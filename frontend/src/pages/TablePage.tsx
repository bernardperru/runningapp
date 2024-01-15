import { GQLActivity, useGetActivityPageQuery, useGetPagesQuery } from '../graphql';
import { Table, IColumnType } from '../components/Table/Table';
import { activityType } from '../utils/constants';
import { usePagination } from '../hooks/usePagination';
import { Card } from '../components/Cards/Card';
import { cardFields } from './CardPageActivities';
import React from 'react';
import RunMap from '../components/Map/RunMap';
import { formatTime } from '../utils/utils';

const columns: IColumnType<GQLActivity>[] = [
	{
		key: 'start_date',
		title: 'Date',
		render: ({ start_date }) => {
			const date = new Date(start_date);
			return <div className="h-6 flex m-4 justify-center">{date.toDateString()}</div>;
		},
		renderHeader(column) {
			return <div className="w-40 h-6 pl-3 flex m-4 justify-center">{column.title}</div>;
		},
	},
	{
		key: 'distance',
		title: 'Distance',
		render: ({ distance }) => {
			return <div className="h-6 flex m-4 justify-center">{(distance / 1000).toFixed(2) + ' km'}</div>;
		},
		renderHeader: column => {
			return <div className="w-20 pl-3 h-6 flex m-4 justify-center">{column.title}</div>;
		},
	},
	{
		key: 'elapsed_time',
		title: 'Time',
		render: ({ elapsed_time }) => {
			return <div className="h-6 flex m-4 justify-center">{formatTime(elapsed_time)}</div>;
		},
		renderHeader: column => {
			return <div className="w-20 pl-3 h-6 flex m-4 justify-center">{column.title}</div>;
		},
	},
	{
		key: 'average_heartrate',
		title: 'Heartrate',
		render: ({ average_heartrate }) => {
			return <div className="h-6 flex m-4 justify-center">{average_heartrate.toFixed(0) + ' bpm'}</div>;
		},
		renderHeader: column => {
			return <div className="w-20 pl-3 h-6 flex m-4 justify-center">{column.title}</div>;
		},
	},
	{
		key: 'average_cadence',
		title: 'Cadence',
		render: ({ average_cadence }) => {
			return <div className="h-6 flex m-4 justify-center">{average_cadence.toFixed(0) + ' spm'}</div>;
		},
		renderHeader: column => {
			return <div className="w-18 pl-3 h-6 flex m-4 justify-center">{column.title}</div>;
		},
	},
	{
		key: 'zone',
		title: 'Zone',
		render: ({ zone }) => {
			return <div className="h-6 flex m-4 justify-center">{zone}</div>;
		},
		renderHeader: column => {
			return <div className="w-18 pl-3 h-6 flex m-4 justify-center">{column.title}</div>;
		},
	},
	{
		key: 'average_pace',
		title: 'Pace',
		render: ({ average_pace }) => {
			return <div className="h-6 flex m-4 justify-center">{average_pace}</div>;
		},
		renderHeader: column => {
			return <div className="w-20 pl-3 h-6 flex m-4 justify-center">{column.title}</div>;
		},
	},
];

export function TablePage() {
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

	function headerInteract(column: IColumnType<GQLActivity>) {
		if (column) {
			setSort({
				sort: column.key as keyof activityType,
				order: column.key === sort.sort ? (sort.order === 'asc' ? 'desc' : 'asc') : 'desc',
			});
		}
	}

	function rowInteract(row: GQLActivity) {
		setViewActivity(row);
	}

	if (viewActivity) {
		return (
			<>
				<div className="hover:bg-sky-500 " onClick={() => setViewActivity(undefined)}>
					{' '}
					Return{' '}
				</div>
				<div className="flex justify-evenly">
					<Card data={viewActivity} fields={cardFields} interact={() => {}} title={['id' as keyof GQLActivity]}></Card>
					<RunMap activity={viewActivity}></RunMap>
				</div>
			</>
		);
	}

	return (
		<div className="py-6">
			<Table
				columns={columns}
				data={data?.getActivityPage.activities}
				headerInteract={headerInteract}
				rowInteract={rowInteract}
				sort={sort}
				loading={loading}></Table>
			{loading && (
				<>
					<div className="h-80" />
					<div className="h-64"></div>
					<div className="pt-3.5"></div>
				</>
			)}
			{pages && (
				<div className="flex justify-center relative">
					<Pagination pagesNumber={pages.getPages}></Pagination>
				</div>
			)}
		</div>
	);
}

export default TablePage;
