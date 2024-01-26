interface ISelectField<T> {
	key: keyof T;
	title: string;
}

interface Props<T> {
	selectFields: ISelectField<T>[];
	remove: () => void;
	add: () => void;
}

//I want this component to be able to add and remove "select fields" so that unlimited data points can be added to the chart

export function ChartCustomizerBar<T>({ selectFields, remove, add }: Props<T>) {
	return <div></div>;
}
