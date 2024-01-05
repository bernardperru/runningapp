import { ICardFieldType } from './Card';
import { Card } from './Card';

interface Props<T> {
	data: T[];
	fields: ICardFieldType<T>[];
	title: keyof T;
	columns: number;
}

export function CardContainer<T>({ data, fields, title, columns }: Props<T>) {
	return (
		<div className={`grid !grid-cols-${columns} gap-4 place-items-center`}>
			{data.map((week, index) => (
				<Card data={week} fields={fields} title={title}></Card>
			))}
		</div>
	);
}
