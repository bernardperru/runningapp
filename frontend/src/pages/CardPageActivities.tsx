import { GQLActivity, useGetWeekActivitiesQuery } from '../graphql';
import { ICardField } from '../components/Cards/Card';
import { CardContainer } from '../components/Cards/CardContainer';
import { useParams } from 'react-router-dom';
import { formatTime } from '../utils/utils';

export const cardFields: ICardField<GQLActivity>[] = [
	{
		key: 'average_cadence',
		title: 'Avg. Cadence',
		render: ({ average_cadence }) => {
			return <>{average_cadence.toFixed(0)} spm</>;
		},
	},
	{
		key: 'distance',
		title: 'Distance',
		render: ({ distance }) => {
			return <>{(distance / 1000).toFixed(2)} km</>;
		},
	},
	{
		key: 'average_heartrate',
		title: 'Avg. Heartrate',
		render: ({ average_heartrate }) => {
			return <>{average_heartrate.toFixed(0)} bpm</>;
		},
	},
	{
		key: 'elapsed_time',
		title: 'Time',
		render: ({ elapsed_time }) => {
			return <>{formatTime(elapsed_time)}</>;
		},
	},
];

const title: Array<keyof GQLActivity> = ['start_date'];

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
				data={data.getWeekActivities}
				fields={cardFields}
				title={title}
				interact={() => {}}></CardContainer>
		</div>
	);
}

export default CardPageActivities;
