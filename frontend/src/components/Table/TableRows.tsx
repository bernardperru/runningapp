import { IColumnType } from './Table';
import { get } from 'lodash';

interface Props<T> {
	data: T[];
	columns: IColumnType<T>[];
	interact?: (value: T) => void;
}

export function TableRows<T>({ data, columns, interact }: Props<T>) {
	if (!data) {
		return <div></div>;
	}
	return (
		<>
			{data.map((item, itemIndex) => (
				<tr key={itemIndex} className={'table-row'}>
					{columns.map((column, columnIndex) => (
						<td className="border p-4 text-gray-900" key={columnIndex}>
							{column.render(item)}
						</td>
					))}
				</tr>
			))}
		</>
	);
}
