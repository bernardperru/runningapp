interface ISelectField<T> {
	key: keyof T;
	title: string;
}

interface Props<T> {
	selectFields: ISelectField<T>[];
	remove: () => void;
	add: () => void;
}

export function ChartCustomizerBar<T>({ selectFields, remove, add }: Props<T>) {
	//add a date range --> 2 fields [] - []
	//specify a range for runs , bottom cap and top cap
	//same for heartrate, cadence, pace
	return <div></div>;
}
