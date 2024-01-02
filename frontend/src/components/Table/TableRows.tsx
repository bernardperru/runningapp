import { IColumnType } from './Table';
import { get } from 'lodash';

interface Props<T> {
	data: T[];
	columns: IColumnType<T>[];
}

//should take an array of objects as a prop
export function TableRows<T>({ data, columns }: Props<T>) {
	return (
		<>
			{data.map((item, itemIndex) => (
				<tr key={itemIndex}>
					{columns.map((column, columnIndex) => (
						<td key={columnIndex}>{get(item, column.key)}</td>
					))}
				</tr>
			))}
		</>
	);
}
