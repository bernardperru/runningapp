import React from 'react';

interface Props {
	type: 'date' | 'other';
}

export function ChartFilter({ type }: Props) {
	const [dateFilter, setDateFilter] = React.useState('');

	const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDateFilter(event.target.value);
		console.log(event.target.value);
	};

	return <></>;
}
