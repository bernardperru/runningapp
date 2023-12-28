import { useState } from 'react';

export const usePagination = () => {
	const first = 15;
	const [offset, setOffset] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);

	const goToPage = (pageNumber: number) => {
		setCurrentPage(pageNumber);
		const page = pageNumber - 1;
		setOffset(first * page);
	};

	const paginationData = {
		first: first,
		offset: offset,
	};

	const Pagination: React.FunctionComponent<{ pagesNumber: number }> = ({ pagesNumber }) => {
		const pages = Array.from({ length: pagesNumber || 0 }, (_, x) => x + 1);

		return (
			<div className="flex justify-center">
				{pages.map((el, index) =>
					currentPage === el ? (
						<button
							key={index}
							onClick={() => {
								goToPage(el);
							}}
							className="h-10 px-5 text-indigo-600 transition-colors duration-150 rounded-l-lg focus:shadow-outline bg-indigo-100">
							{el}
						</button>
					) : (
						<button
							key={index}
							onClick={() => {
								goToPage(el);
							}}
							className="h-10 px-5 text-indigo-600 transition-colors duration-150 bg-white rounded-l-lg focus:shadow-outline hover:bg-indigo-100">
							{el}
						</button>
					)
				)}
			</div>
		);
	};
	return { paginationData, Pagination };
};
