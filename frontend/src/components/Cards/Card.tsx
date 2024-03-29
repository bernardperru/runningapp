export interface ICardField<T> {
	key: keyof T;
	title: string;
	render: (obj: T) => JSX.Element;
}

interface Props<T> {
	data: T;
	fields: ICardField<T>[];
	title: Array<keyof T>; //probably should change this
	interact: (obj: T) => void;
}

export function Card<T>({ data, fields, title, interact }: Props<T>) {
	return (
		<div className="bg-grey-300 hover:bg-sky-300 shadow-lg rounded-md py-7 px-12 mt-6" onClick={() => interact(data)}>
			<h1 className="text-2xl text-gray-900 font-normal border-b-2 border-black w-fit">
				{title.map(a => data[a] + ' ')}
			</h1>
			<ul className="">
				{fields.map((field, fieldIndex) => (
					<li key={fieldIndex}>
						{field.title} : {field.render(data)}
					</li>
				))}
			</ul>
		</div>
	);
}
