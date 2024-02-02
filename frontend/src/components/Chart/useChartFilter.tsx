import React from 'react';

export interface IFilter<T> {
	type: 'date' | 'number';
	title: string;
	key: keyof T;
}

interface filterValues<T> {
	key: keyof T;
	title: string;
	type: 'date' | 'number';
	lower: number | string;
	upper: number | string;
}

export function useChartFilter<T>(data: IFilter<T>[]) {
	const [filterValues, setFilterValues] = React.useState<filterValues<T>[]>(
		data.map(filter => {
			return {
				key: filter.key,
				lower: filter.type === 'date' ? '' : 0,
				upper: filter.type === 'date' ? '' : 0,
				title: filter.title,
				type: filter.type,
			};
		})
	);

	const handleLower = (event: React.ChangeEvent<HTMLInputElement>, filter: IFilter<T>) => {
		setFilterValues(
			filterValues.map(currentFilter => {
				return filter.key === currentFilter.key
					? { ...currentFilter, lower: filter.type === 'date' ? event.target.value : parseFloat(event.target.value) }
					: currentFilter;
			})
		);
	};

	const handleUpper = (event: React.ChangeEvent<HTMLInputElement>, filter: IFilter<T>) => {
		setFilterValues(
			filterValues.map(currentFilter => {
				return filter.key === currentFilter.key
					? { ...currentFilter, upper: filter.type === 'date' ? event.target.value : parseFloat(event.target.value) }
					: currentFilter;
			})
		);
	};

	const FilterInput = () => {
		return (
			<span className="">
				{filterValues.map((filter, index) => (
					<div key={index}>
						{filter.title}
						<input
							name={filter.title}
							type={filter.type}
							onChange={e => handleLower(e, filter)}
							value={filter.lower}
							className="border-gray-400 border-2"></input>
						<input
							name={filter.title}
							type={filter.type}
							onChange={e => handleUpper(e, filter)}
							value={filter.upper}
							className="border-gray-400 border-2"></input>
					</div>
				))}
			</span>
		);
	};

	return { FilterInput };
}
