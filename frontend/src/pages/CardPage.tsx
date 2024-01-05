import { useGetWeeksPageQuery } from '../graphql';
import { weekCardType } from '../utils/constants';
import { usePagination } from '../hooks/usePagination';
import { Card, ICardFieldType } from '../components/Cards/Card';
import { CardContainer } from '../components/Cards/CardContainer';
import { Link } from 'react-router-dom';

const cardFields: ICardFieldType<weekCardType>[] = [
	{
		key: 'cadence',
		title: 'Avg. Cadence',
		render: (_, { cadence, activityCount }) => {
			return (cadence / activityCount).toFixed(0) + ' spm';
		},
	},
	{
		key: 'distance',
		title: 'Distance',
		render: (_, { distance }) => {
			return (distance / 1000).toFixed(2) + ' km';
		},
	},
	{
		key: 'heartrate',
		title: 'Avg. Heartrate',
		render: (_, { heartrate, activityCount }) => {
			return (heartrate / activityCount).toFixed(0) + ' bpm';
		},
	},
	{
		key: 'time',
		title: 'Time',
		render: (_, { time }) => {
			const addZero = (x: number) => {
				if (x < 10) {
					return '0' + x.toString();
				}
				return x.toString();
			};
			const hours = Math.floor(time / 3600);
			const newValue = time - hours * 3600;
			const minutes = Math.floor(newValue / 60);
			const seconds = newValue - minutes * 60;
			return addZero(hours) + ':' + addZero(minutes) + ':' + addZero(seconds) + '';
		},
	},
];

export function CardPage() {
	const { paginationData, Pagination } = usePagination(20);

	const { data } = useGetWeeksPageQuery({
		variables: {
			first: paginationData.first,
			offset: paginationData.offset,
		},
	});

	if (!data) {
		return <></>;
	}

	return (
		<div>
			<CardContainer columns={4} data={data.getWeeksPage.weeks} fields={cardFields} title={'Title'}></CardContainer>
			<div className="py-4">
				<Pagination pagesNumber={data.getWeeksPage.pages}></Pagination>
			</div>
		</div>
	);
}

export default CardPage;
