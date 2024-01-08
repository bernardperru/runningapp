import { ICardFieldType } from './Card';
import { Card } from './Card';

interface Props<T> {
	data: T[];
	fields: ICardFieldType<T>[];
	title: Array<keyof T>;
	columns: number;
	interact: (obj: T) => void;
}

export function CardContainer<T>({ data, fields, title, columns, interact }: Props<T>) {
	return (
		<div className={`grid !grid-cols-4 gap-4 place-items-center`}>
			{data.map((week, index) => (
				<Card key={index} data={week} fields={fields} title={title} interact={interact}></Card>
			))}
		</div>
	);
}
