import { get } from 'lodash';

export interface ICardFieldType<T> {
	key: string;
	title: string;
	render?: (cardField: ICardFieldType<T>, item: T) => void;
}

interface Props<T> {
	data: T;
	fields: ICardFieldType<T>[];
	title: Array<keyof T>;
	interact: (obj: T) => void;
}

export function Card<T>({ data, fields, title, interact }: Props<T>) {
	return (
		<div className="bg-grey-300 hover:bg-sky-300 shadow-lg rounded-md py-7 px-12 mt-6" onClick={() => interact(data)}>
			<h1 className="text-2xl text-gray-900 font-normal border-b-2 border-black w-fit">
				{title ? title.map(a => get(data, a) + ' ') : ''}
			</h1>
			<ul className="">
				{fields.map((field, fieldIndex) => (
					<li key={fieldIndex}>
						{field.title} : {field.render ? field.render(field, data) : get(data, field.key)}
					</li>
				))}
			</ul>
		</div>
	);
}
