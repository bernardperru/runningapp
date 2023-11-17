import { GQLActivity } from '@/graphql';
import { useState, useEffect } from 'react';

const calculateRange = (data: GQLActivity[], rowsPerPage: number) => {
	const range = [];
	const num = Math.ceil(data.length / rowsPerPage);
	let i = 1;
	for (let i = 1; i <= num; i++) {
		range.push(i);
	}
	return range;
};

const sliceData = (data: GQLActivity[], page: number, rowsPerPage: number) => {
	return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
};

export const useTable = (data: GQLActivity[], page: number, rowsPerPage: number) => {
	const [tableRange, setTableRange] = useState<number[]>([]);
	const [slice, setSlice] = useState<GQLActivity[]>([]);

	useEffect(() => {
		const range = calculateRange(data, rowsPerPage);
		setTableRange([...range]);

		const slice = sliceData(data, page, rowsPerPage);
		setSlice([...slice]);
	}, [data, setTableRange, page, setSlice]);

	return { slice, range: tableRange };
};
