import { GQLActivity, useGetActivityPageQuery } from '../graphql';
import { Table, IColumnType } from '../components/Table/Table';
import { activityType } from '../utils/constants';
import { usePagination } from '../hooks/usePagination';
import React from 'react';

const labels: { [key in keyof activityType]: string } = {
	start_date: 'Date',
	distance: 'Distance',
	elapsed_time: 'Time',
	average_heartrate: 'Avg. Heartrate',
	average_cadence: 'Avg. Cadence',
	zone: 'Zone',
	average_pace: 'Avg. Pace',
};

const columns: IColumnType<activityType>[] = [
	{ key: 'start_date', title: 'Date' },
	{ key: 'distance', title: 'Distance' },
	{ key: 'elapsed_time', title: 'Time' },
	{ key: 'average_heartrate', title: 'Avg. Heartrate' },
	{ key: 'average_cadence', title: 'Avg. Cadence' },
	{ key: 'zone', title: 'Zone' },
	{ key: 'average_pace', title: 'Avg. Pace' },
];

export function TablePage() {
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

	if (!data) {
		return <>No data</>;
	}

	return (
		<>
			<Table columns={columns} data={data.getActivityPage.activities}></Table>
			<Pagination pagesNumber={data.getActivityPage.pages}></Pagination>
		</>
	);
}

export default TablePage;
