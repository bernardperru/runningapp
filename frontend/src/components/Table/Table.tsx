import { TableHeader } from './TableHeader';
import { TableRows } from './TableRows';
import { format } from '../../utils/utils';

export interface IColumnType<T> {
	key: string;
	title: string;
	render: (value: number | string) => string | number;
}

interface Props<T> {
	data: T[];
	columns: IColumnType<T>[];
}

export function Table<T>({ data, columns }: Props<T>) {
	return (
		<table className=" bg-white m-auto">
			<thead className="bg-grey-300">
				<TableHeader columns={columns}></TableHeader>
			</thead>
			<tbody className="h-5">
				<TableRows columns={columns} data={data}></TableRows>
			</tbody>
		</table>
	);
}
