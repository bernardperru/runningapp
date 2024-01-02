import { TableHeader } from './TableHeader';
import { TableRows } from './TableRows';

export interface IColumnType<T> {
	key: string;
	title: string;
}

interface Props<T> {
	data: T[];
	columns: IColumnType<T>[];
}

export function Table<T>({ data, columns }: Props<T>) {
	return (
		<table>
			<thead>
				<TableHeader columns={columns}></TableHeader>
			</thead>
			<tbody>
				<TableRows columns={columns} data={data}></TableRows>
			</tbody>
		</table>
	);
}
