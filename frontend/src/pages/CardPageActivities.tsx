import { GQLActivity, useGetWeekActivitiesQuery, useGetWeeksPageQuery } from '../graphql';
import { activityCardType, activityType, weekCardType1 } from '../utils/constants';
import { usePagination } from '../hooks/usePagination';
import { ICardFieldType } from '../components/Cards/Card';
import { CardContainer } from '../components/Cards/CardContainer';
import { useParams } from 'react-router-dom';

const cardFields: ICardFieldType<activityType>[] = [
	{
		key: 'average_cadence',
		title: 'Avg. Cadence',
		render: (_, { average_cadence }) => {
			return average_cadence.toFixed(0) + ' spm';
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
		key: 'average_heartrate',
		title: 'Avg. Heartrate',
		render: (_, { average_heartrate }) => {
			return average_heartrate.toFixed(0) + ' bpm';
		},
	},
	{
		key: 'time',
		title: 'Time',
		render: (_, { elapsed_time }) => {
			const addZero = (x: number) => {
				if (x < 10) {
					return '0' + x.toString();
				}
				return x.toString();
			};
			const hours = Math.floor(elapsed_time / 3600);
			const newValue = elapsed_time - hours * 3600;
			const minutes = Math.floor(newValue / 60);
			const seconds = newValue - minutes * 60;
			return addZero(hours) + ':' + addZero(minutes) + ':' + addZero(seconds) + '';
		},
	},
];

const title: Array<keyof activityType> = ['start_date'];

export function CardPageActivities() {
	const { yearNumber, weekNumber } = useParams();

	const { data } = useGetWeekActivitiesQuery({
		variables: {
			week: weekNumber ? parseInt(weekNumber) : 0,
			year: yearNumber ? parseInt(yearNumber) : 0,
		},
	});

	if (!data) {
		return <></>;
	}

	return (
		<div>
			<CardContainer
				columns={3}
				data={data.getWeekActivities}
				fields={cardFields}
				title={title}
				interact={() => console.log()}></CardContainer>
		</div>
	);
}

export default CardPageActivities;
