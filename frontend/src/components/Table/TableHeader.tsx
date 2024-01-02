import { IColumnType } from './Table';

interface Props<T> {
	columns: IColumnType<T>[];
}

export function TableHeader<T>({ columns }: Props<T>) {
	return (
		<tr>
			{columns.map((column, columnindex) => (
				<th>{column.title}</th>
			))}
		</tr>
	);
}
