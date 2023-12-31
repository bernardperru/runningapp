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
			const date = new Date(value);
			return date.toDateString();
		},
	},
	{
		key: 'distance',
		title: 'Distance',
		render: value => {
			return (parseFloat(value.toString()) / 1000).toFixed(2) + ' km';
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
			const hours = Math.floor(parseFloat(value.toString()) / 3600);
			const newValue = parseFloat(value.toString()) - hours * 3600;
			const minutes = Math.floor(newValue / 60);
			const seconds = newValue - minutes * 60;
			return addZero(hours) + ':' + addZero(minutes) + ':' + addZero(seconds) + '';
		},
	},
	{
		key: 'average_heartrate',
		title: 'Avg. Heartrate',
		render: value => {
			return parseFloat(value.toString()).toFixed(0) + ' bpm';
		},
	},
	{
		key: 'average_cadence',
		title: 'Avg. Cadence',
		render: value => {
			return parseFloat(value.toString()).toFixed(0) + ' spm';
		},
	},
	{
		key: 'zone',
		title: 'Zone',
		render: value => {
			return value;
		},
	},
	{
		key: 'average_pace',
		title: 'Avg. Pace',
		render: value => {
			return value;
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

	const activities = data?.getActivityPage.activities;

	return (
		<div className="py-6">
			<Table
				columns={columns}
				data={activities}
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
