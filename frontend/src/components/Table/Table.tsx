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
				<TableHeader></TableHeader>
			</thead>
			<tbody>
				<TableRows></TableRows>
			</tbody>
		</table>
	);
}
