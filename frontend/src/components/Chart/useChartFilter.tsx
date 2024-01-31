import React from 'react';

export interface IFilter<T> {
	type: 'date' | number;
	title: string;
	key: keyof T;
}

interface Props<T> {
	data: IFilter<T>[];
}

export function useChartFilter<T>({ data }: Props<T>) {
	const handleLower = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLower(type === 'date' ? event.target.value : parseFloat(event.target.value));
	};

	const handleUpper = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUpper(type === 'date' ? event.target.value : parseFloat(event.target.value));
	};

	const FilterInput = () => {
		return (
			<>
				{title}
				<input type={type} onChange={handleLower} value={lower} className="border-gray-400 border-2"></input>
				<input type={type} onChange={handleUpper} value={upper} className="border-gray-400 border-2"></input>
			</>
		);
	};

	return { FilterInput };
}
