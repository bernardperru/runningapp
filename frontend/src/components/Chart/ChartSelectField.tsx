interface ISelectField<T> {
	key: keyof T;
	title: string;
}

interface Props<T> {
	name: string;
	selectField: ISelectField<T>[];
	interact: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function ChartSelectField<T>({ name, selectField, interact }: Props<T>) {
	return (
		<div>
			{name}
			<select className="border border-black flex justify-center" onChange={interact}>
				{selectField.map((el, index) => (
					<option key={index}>{el.title}</option>
				))}
			</select>
		</div>
	);
}
