import Chart from '../components/Chart/Chart';
import { useGetActivitiesQuery } from '../graphql';
import { ChartSelect } from '../components/Chart/ChartSelect';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import React from 'react';
import { AxisType, ChartActivity, ChartFilter, chartFilters, xAxis, yAxis } from '../utils';

export type ChartForm = {
	x: AxisType<ChartActivity>;
	leftY: AxisType<ChartActivity>;
	rightY: AxisType<ChartActivity>;
};

export const ChartPage: React.FunctionComponent = () => {
	const { register, getValues } = useForm<ChartForm>();
	const { data } = useGetActivitiesQuery();

	if (!data) {
		return <></>;
	}

	return (
		<div className="m-4 flex flex-row justify-center items-center">
			<div className="flex flex-col justify-center items-center">
				<ChartSelect register={register} id="x" options={yAxis} label="X" />
				<ChartSelect register={register} id="leftY" options={yAxis} label="Y" />
				<ChartSelect register={register} id="rightY" options={xAxis} label="Y2" />
			</div>
			<div className="flex justify-center items-center w-1/2">
				{/* <Chart data={filterActivities()} x={getValues().x} yLeft={getValues().leftY} yRight={getValues().rightY} /> */}
			</div>
			<button
				onClick={() => {
					console.log(getValues());
				}}>
				button
			</button>
		</div>
	);
};
