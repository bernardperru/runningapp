import { useGetActivitiesQuery } from '../graphql';
import { useForm } from 'react-hook-form';

import React from 'react';
import { ChartActivity, xAxis, yAxis } from '../utils';
import { ChartSelect, Chart, InputRange } from '../components';

export type ChartForm = {
	x: keyof ChartActivity;
	y1: keyof ChartActivity;
	y2: keyof ChartActivity;
	distanceLower: number;
	distanceUpper: number;
	heartrateLower: number;
	heartrateUpper: number;
};

export const ChartPage: React.FunctionComponent = () => {
	const { control, watch, getValues } = useForm<ChartForm>();
	const { data } = useGetActivitiesQuery();
	const watchAllFields = watch();

	if (!data) {
		return <></>;
	}

	return (
		<div className="pt-4 flex flex-row justify-evenly ">
			<div className="flex items-start justify-start border border-black rounded-md p-4">
				<form className="flex flex-col gap-2 ">
					<div className="flex flex-row gap-2">
						<ChartSelect label="X" controlProps={{ control: control, name: 'x' }} options={xAxis}></ChartSelect>
						<ChartSelect label="Y1" controlProps={{ control: control, name: 'y1' }} options={yAxis}></ChartSelect>
						<ChartSelect label="Y2" controlProps={{ control: control, name: 'y2' }} options={yAxis}></ChartSelect>
					</div>
					<div>
						<InputRange
							label="Distance"
							id={{ from: 'distanceFrom', to: 'distanceTo' }}
							placeholder={{ from: 'km', to: 'km' }}
							type="text"
						/>
						<InputRange
							label="Date"
							id={{ from: 'distanceFrom', to: 'distanceTo' }}
							placeholder={{ from: 'from', to: 'to' }}
							type="date"
						/>
						<InputRange
							label="Heartrate"
							id={{ from: 'distanceFrom', to: 'distanceTo' }}
							placeholder={{ from: 'bpm', to: 'bpm' }}
							type="text"
						/>
					</div>
				</form>
			</div>

			<div className="flex justify-center items-center w-1/2">
				<Chart data={data.getActivities} x={getValues().x} y1={getValues().y1} y2={getValues().y2} />
			</div>
		</div>
	);
};
