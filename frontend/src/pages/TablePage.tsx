import { useGetActivityPageQuery, useGetPagesQuery } from '../graphql';
import { Table, IColumnType } from '../components/Table/Table';
import { activityType } from '../utils/constants';
import { usePagination } from '../hooks/usePagination';
import React from 'react';

const columns: IColumnType<activityType>[] = [
	{
		key: 'start_date',
		title: 'Date',
		render: value => {
			const date = new Date(value.start_date);
			return <div className="h-6 flex m-4 justify-center">{date.toDateString()}</div>;
		},
		renderHeader(column) {
			return <div className="w-40 h-6 pl-3 flex m-4 justify-center">{column.title}</div>;
		},
	},
	{
		key: 'distance',
		title: 'Distance',
		render: value => {
			return <div className="h-6 flex m-4 justify-center">{(value.distance / 1000).toFixed(2) + ' km'}</div>;
		},
		renderHeader(column) {
			return <div className="w-20 pl-3 h-6 flex m-4 justify-center">{column.title}</div>;
		},
	},
	{
		key: 'elapsed_time',
		title: 'Time',
		render: value => {
			const addZero = (x: number) => {
				if (x < 10) {
					return '0' + x.toString();
				}
				return x.toString();
			};
			const hours = Math.floor(value.elapsed_time / 3600);
			const newValue = value.elapsed_time - hours * 3600;
			const minutes = Math.floor(newValue / 60);
			const seconds = newValue - minutes * 60;
			return (
				<div className="h-6 flex m-4 justify-center">
					{addZero(hours) + ':' + addZero(minutes) + ':' + addZero(seconds) + ''}
				</div>
			);
		},
		renderHeader(column) {
			return <div className="w-20 pl-3 h-6 flex m-4 justify-center">{column.title}</div>;
		},
	},
	{
		key: 'average_heartrate',
		title: 'Heartrate',
		render: value => {
			return <div className="h-6 flex m-4 justify-center">{value.average_heartrate.toFixed(0) + ' bpm'}</div>;
		},
		renderHeader(column) {
			return <div className="w-20 pl-3 h-6 flex m-4 justify-center">{column.title}</div>;
		},
	},
	{
		key: 'average_cadence',
		title: 'Cadence',
		render: value => {
			return <div className="h-6 flex m-4 justify-center">{value.average_cadence.toFixed(0) + ' spm'}</div>;
		},
		renderHeader(column) {
			return <div className="w-18 pl-3 h-6 flex m-4 justify-center">{column.title}</div>;
		},
	},
	{
		key: 'zone',
		title: 'Zone',
		render: value => {
			return <div className="h-6 flex m-4 justify-center">{value.zone}</div>;
		},
		renderHeader(column) {
			return <div className="w-18 pl-3 h-6 flex m-4 justify-center">{column.title}</div>;
		},
	},
	{
		key: 'average_pace',
		title: 'Pace',
		render: value => {
			return <div className="h-6 flex m-4 justify-center">{value.average_pace}</div>;
		},
		renderHeader(column) {
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

	function headerInteract(column: IColumnType<activityType> | undefined) {
		if (column) {
			setSort({
				sort: column.key as keyof activityType,
				order: column.key === sort.sort ? (sort.order === 'asc' ? 'desc' : 'asc') : 'desc',
			});
		}
	}

	function rowInteract(row: activityType) {}

	return (
		<div className="py-6">
			<Table
				columns={columns}
				data={data?.getActivityPage.activities}
				headerInteract={headerInteract}
				rowInteract={rowInteract}
				sort={sort}
				loading={loading}></Table>

			{pages && (
				<div className="">
					<Pagination pagesNumber={pages.getPages}></Pagination>
				</div>
			)}
		</div>
	);
}

export default TablePage;
