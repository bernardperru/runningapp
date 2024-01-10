import { activityType } from '@/utils/constants';
import Chart from '../components/Chart/Chart';
import { IAxis } from '../components/Chart/Chart';
import { useGetWeeksQuery } from '../graphql';

// const axis: IAxis<activityType>[] = Object.keys(x);

const ChartPage: React.FunctionComponent = () => {
	const { data } = useGetWeeksQuery();

	if (!data) {
		return <></>;
	}

	let keys = Object.keys(data.getWeeks[0]) as string[];
	keys = keys.filter(key => {
		return key.toString() !== '__typename';
	});
	console.log({ keys });

	return <></>;
	// return <Chart data={} x={} y={}></Chart>;
};

export default ChartPage;
