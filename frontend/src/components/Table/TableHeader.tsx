import { IColumnType } from './Table';
import { BsFillCaretUpFill, BsFillCaretDownFill } from 'react-icons/bs';

interface Props<T> {
	columns: IColumnType<T>[];
	interact?: (value: IColumnType<T>) => void;
	sort?: { sort: keyof T; order: 'asc' | 'desc' };
}

export function TableHeader<T>({ columns, interact, sort }: Props<T>) {
	return (
		<tr>
			{columns.map((column, columnindex) => (
				<th
					key={columnindex}
					className="border-2 border-grey-500 p-4 font-normal text-gray-900 hover:bg-sky-400"
					onClick={() => (interact ? interact(column) : () => {})}>
					<div className="flex justify-center">
						<span>{column.title}</span>
						{sort && sort.sort === column.key ? (
							sort.order === 'asc' ? (
								<BsFillCaretUpFill />
							) : (
								<BsFillCaretDownFill />
							)
						) : (
							<div className="px-2"></div>
						)}
					</div>
				</th>
			))}
		</tr>
	);
}
