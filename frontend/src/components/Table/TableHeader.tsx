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
					className={`w-${column.width} border-2 border-grey-500 font-normal text-gray-900 hover:bg-sky-400 h-14 pl-3 `}
					onClick={() => (interact ? interact(column) : () => {})}>
					<div className={`flex justify-center`}>
						<span>{column.renderHeader(column)}</span>
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
