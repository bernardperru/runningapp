interface ISelectField<T> {
	key: keyof T;
	title: string;
}

interface Props<T> {
	selectFields: ISelectField<T>[];
}

export function ChartCustomizerBar() {
	return <div></div>;
}
