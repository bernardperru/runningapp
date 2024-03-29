import { usePagination } from '../hooks';
import { CardContainer, ICardField } from '../components';
import { GQLWeek, useGetWeeksPageQuery } from '../graphql';
import { formatTime } from '../utils';
import { useNavigate } from 'react-router-dom';

const cardFields: ICardField<GQLWeek>[] = [
	{
		key: 'cadence',
		title: 'Avg. Cadence',
		render: ({ cadence, activityCount }) => {
			return <>{(cadence / activityCount).toFixed(0)} spm</>;
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
		key: 'heartrate',
		title: 'Avg. Heartrate',
		render: ({ heartrate, activityCount }) => {
			return <>{(heartrate / activityCount).toFixed(0)} bpm</>;
		},
	},
	{
		key: 'time',
		title: 'Time',
		render: ({ time }) => {
			return <>{formatTime(time)}</>;
		},
	},
];

const title: Array<keyof GQLWeek> = ['week', 'year'];

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
