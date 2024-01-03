import { IColumnType } from './Table';

interface Props<T> {
	columns: IColumnType<T>[];
	interact: (value: any) => void;
}

export function TableHeader<T>({ columns, interact }: Props<T>) {
	return (
		<tr>
			{columns.map((column, columnindex) => (
				<th
					className="border-2 border-grey-500 p-4 font-normal text-gray-900 hover:bg-sky-400"
					onClick={() => interact(column.key)}>
					{column.title}
				</th>
			))}
		</tr>
	);
}
