import { get } from 'lodash';

export interface ICardFieldType<T> {
	key: string;
	title: string;
	render?: (cardField: ICardFieldType<T>, item: T) => void;
}

interface Props<T> {
	data: T;
	fields: ICardFieldType<T>[];
	title?: string | number;
}

export function Card<T>({ data, fields, title }: Props<T>) {
	console.log({ data });
	console.log({ fields });
	return (
		<div className="bg-grey-300 hover:bg-sky-300 shadow-lg rounded-md py-7 px-12 mt-6">
			<h1 className="text-2xl text-gray-900 font-normal border-b-2 border-black w-fit">{title}</h1>
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
