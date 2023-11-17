import { GQLActivity } from '@/graphql';
import { useEffect } from 'react';

const TableFooter: React.FunctionComponent<{
	range: number[];
	setPage: React.Dispatch<React.SetStateAction<number>>;
	page: number;
	slice: GQLActivity[];
}> = ({ range, setPage, page, slice }) => {
	useEffect(() => {
		if (slice.length < 1 && page !== 1) {
			setPage(page - 1);
		}
	}, [slice, page, setPage]);
	return (
		<div>
			{range.map((el, index) => (
				<button key={index} onClick={() => setPage(el)}>
					{el}
				</button>
			))}
		</div>
	);
};

export default TableFooter;
