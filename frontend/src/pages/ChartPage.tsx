import Chart from '../components/Chart/Chart';
import { useGetActivitiesQuery } from '../graphql';
import { ChartSelect } from '../components/Chart/ChartSelect';
import { useForm } from 'react-hook-form';

import React from 'react';
import { ChartActivity, xAxis, yAxis } from '../utils';

export type ChartForm = {
	x: keyof ChartActivity;
	y1: keyof ChartActivity;
	y2: keyof ChartActivity;
};

export const ChartPage: React.FunctionComponent = () => {
	const { register, getValues, watch } = useForm<ChartForm>();
	const { data } = useGetActivitiesQuery();
	const watchAllFields = watch();

	if (!data) {
		return <></>;
	}

	return (
		<div className="m-4 flex flex-row justify-center items-center">
			<form className="flex flex-col justify-center items-center">
				<ChartSelect register={register} id="x" options={xAxis} label="X" />
				<ChartSelect register={register} id="y1" options={yAxis} label="Y1" />
				<ChartSelect register={register} id="y2" options={yAxis} label="Y2" />
			</form>
			<div className="flex justify-center items-center w-1/2">
				<Chart data={data.getActivities} x={getValues().x} y1={getValues().y1} y2={getValues().y2} />
			</div>
		</div>
	);
};
