import { activityType } from '@/utils/constants';
import Chart from '../components/Chart/Chart';
import { IAxis } from '../components/Chart/Chart';
import { useGetWeeksQuery } from '../graphql';
import React from 'react';

// const axis: IAxis<activityType>[] = Object.keys(x);

const ChartPage: React.FunctionComponent = () => {
	const [selectedOption, setSelectedOption] = React.useState<string>('');
	const { data } = useGetWeeksQuery();

	if (!data) {
		return <></>;
	}

	let keys = Object.keys(data.getWeeks[0]) as string[];
	keys = keys.filter(key => {
		return key.toString() !== '__typename';
	});

	const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value;
		setSelectedOption(value);
	};

	console.log(selectedOption);

	return (
		<span>
			<select className="border border-black flex justify-center" onChange={selectChange}>
				{keys.map(key => (
					<option>{key}</option>
				))}
			</select>
			<Chart data={data.getWeeks} x={selectedOption}></Chart>
		</span>
	);
	// return <Chart data={} x={} y={}></Chart>;
};

export default ChartPage;
