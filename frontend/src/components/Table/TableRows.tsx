import { IColumnType } from './Table';

interface Props<T> {
	data?: T[];
	columns: IColumnType<T>[];
	interact?: (value: T) => void;
}

export function TableRows<T>({ data, columns, interact }: Props<T>) {
	return (
		<>
			{data &&
				data.map((item, itemIndex) => (
					<tr key={itemIndex} className={'table-row'}>
						{columns.map((column, columnIndex) => (
							<td className="border text-gray-900" key={columnIndex}>
								{column.render(item)}
							</td>
						))}
					</tr>
				))}
		</>
	);
}
