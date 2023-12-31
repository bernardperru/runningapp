import { TableHeader } from './TableHeader';
import { TableRows } from './TableRows';
import { SpinningCircles } from 'react-loading-icons';

export interface IColumnType<T> {
	key: string;
	title: string;
	render: (value: number | string) => string | number;
	renderHeader?: (column: IColumnType<T>, item: T) => void;
}

interface Props<T> {
	data: T[] | undefined;
	columns: IColumnType<T>[];
	headerInteract?: (value: IColumnType<T>) => void;
	rowInteract?: (value: any) => void;
	sort: { sort: keyof T; order: 'asc' | 'desc' };
	loading: boolean;
}

export function Table<T>({ data, columns, headerInteract, rowInteract, sort, loading }: Props<T>) {
	return (
		<table className=" bg-white m-auto">
			<thead className="bg-grey-300">
				<TableHeader columns={columns} interact={headerInteract} sort={sort}></TableHeader>
			</thead>
			{data && (
				<tbody className="h-5">
					<TableRows columns={columns} data={data} interact={rowInteract}></TableRows>
				</tbody>
			)}
		</table>
	);
}
