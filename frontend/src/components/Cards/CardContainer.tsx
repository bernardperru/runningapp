import { ICardField } from './Card';
import { Card } from './Card';

interface Props<T> {
	data: T[];
	fields: ICardField<T>[];
	title: Array<keyof T>;
	interact: (obj: T) => void;
}

export function CardContainer<T>({ data, fields, title, interact }: Props<T>) {
	return (
		<div className={`grid !grid-cols-4 gap-4 place-items-center`}>
			{data.map((week, index) => (
				<Card key={index} data={week} fields={fields} title={title} interact={interact}></Card>
			))}
		</div>
	);
}
