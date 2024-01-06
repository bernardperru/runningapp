import { useState } from 'react';

export const usePagination = (first: number) => {
	const [offset, setOffset] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);

	const goToPage = (pageNumber: number) => {
		setCurrentPage(pageNumber);
		setOffset(first * (pageNumber - 1));
	};

	const paginationData = {
		first: first,
		offset: offset,
	};

	const Pagination: React.FunctionComponent<{ pagesNumber: number | undefined }> = ({ pagesNumber }) => {
		const pages = Array.from({ length: pagesNumber || 0 }, (_, x) => x + 1);

		return (
			<div className="flex justify-center sticky">
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
