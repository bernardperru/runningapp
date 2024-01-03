import { IColumnType } from './Table';

interface Props<T> {
	columns: IColumnType<T>[];
}

export function TableHeader<T>({ columns }: Props<T>) {
	return (
		<tr>
			{columns.map((column, columnindex) => (
				<th className="border-2 border-grey-500 p-4 font-normal text-gray-900 hover:bg-sky-400">{column.title}</th>
			))}
		</tr>
	);
}
