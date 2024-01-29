import { TableHeader } from './TableHeader';
import { TableRows } from './TableRows';

export interface IColumnType<T> {
	key: keyof T;
	title: string;
	width: string;
	render: (value: T) => JSX.Element;
	renderHeader: (column: IColumnType<T>) => JSX.Element;
}

interface Props<T> {
	data?: T[];
	columns: IColumnType<T>[];
	headerInteract: (value: IColumnType<T>) => void;
	rowInteract: (value: T) => void;
	sort: { sort: keyof T; order: 'asc' | 'desc' };
}

export function Table<T>({ data, columns, headerInteract, rowInteract, sort }: Props<T>) {
	return (
		<table className=" bg-white m-auto">
			<thead className="bg-blue-200">
				<TableHeader columns={columns} interact={headerInteract} sort={sort}></TableHeader>
			</thead>
			{data && (
				<tbody>
					<TableRows columns={columns} data={data} interact={rowInteract}></TableRows>
				</tbody>
			)}
		</table>
	);
}
