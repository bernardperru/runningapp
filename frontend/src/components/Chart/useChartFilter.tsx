import React from 'react';

export interface IFilter<T> {
	type: 'date' | 'number';
	title: string;
	key: keyof T;
}

export function useChartFilter<T>(data: IFilter<T>[]) {
	const handleLower = (event: React.ChangeEvent<HTMLInputElement>) => {
		//setLower(type === 'date' ? event.target.value : parseFloat(event.target.value));
	};

	const handleUpper = (event: React.ChangeEvent<HTMLInputElement>) => {
		//setUpper(type === 'date' ? event.target.value : parseFloat(event.target.value));
	};

	const FilterInput = () => {
		return (
			<>
				{data.map(filter => (
					<div>
						{filter.title}
						<input type={filter.type} onChange={handleLower} className="border-gray-400 border-2"></input>
						<input type={filter.type} onChange={handleUpper} className="border-gray-400 border-2"></input>
					</div>
				))}
			</>
		);
	};

	return { FilterInput };
}
