import { GQLWeek, useGetWeeksPageQuery } from '../graphql';
import { weekCardType1 } from '../utils/constants';
import { usePagination } from '../hooks/usePagination';
import { ICardField } from '../components/Cards/Card';
import { CardContainer } from '../components/Cards/CardContainer';
import { useNavigate } from 'react-router-dom';

const cardFields: ICardField<GQLWeek>[] = [
	{
		key: 'cadence',
		title: 'Avg. Cadence',
		render: ({ cadence, activityCount }) => {
			return (cadence / activityCount).toFixed(0) + ' spm';
		},
	},
	{
		key: 'distance',
		title: 'Distance',
		render: ({ distance }) => {
			return (distance / 1000).toFixed(2) + ' km';
		},
	},
	{
		key: 'heartrate',
		title: 'Avg. Heartrate',
		render: ({ heartrate, activityCount }) => {
			return (heartrate / activityCount).toFixed(0) + ' bpm';
		},
	},
	{
		key: 'time',
		title: 'Time',
		render: ({ time }) => {
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

const title: Array<keyof weekCardType1> = ['week', 'year'];

export function CardPageWeeks() {
	const { paginationData, Pagination } = usePagination(8);
	const navigate = useNavigate();

	const { data } = useGetWeeksPageQuery({
		variables: {
			first: paginationData.first,
			offset: paginationData.offset,
		},
	});

	function interact(week: GQLWeek) {
		navigate(`/weekly/${week.year}/${week.week}`);
	}

	if (!data) {
		return <></>;
	}

	return (
		<div>
			<CardContainer
				data={data.getWeeksPage.weeks}
				fields={cardFields}
				title={title}
				interact={interact}></CardContainer>
			<div className="py-4">
				<Pagination pagesNumber={data.getWeeksPage.pages}></Pagination>
			</div>
		</div>
	);
}

export default CardPageWeeks;
