import { useGetActivitiesQuery } from '../graphql';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import React from 'react';
import { ChartActivity, xAxis, yAxis } from '../utils';
import { ChartSelect, Chart, InputRange, ChartSelectProps } from '../components';

export type ChartForm = {
	x: keyof ChartActivity;
	y1: keyof ChartActivity;
	y2: keyof ChartActivity;
};

const chartProps: ChartSelectProps<ChartActivity, ChartForm>[] = [
	{ id: 'x', label: 'X', options: xAxis },
	{ id: 'y1', label: 'Y1', options: yAxis },
	{ id: 'y2', label: 'Y2', options: yAxis },
];

export const ChartPage: React.FunctionComponent = () => {
	const methods = useForm<ChartForm>();
	const { data } = useGetActivitiesQuery();
	const watchAllFields = methods.watch();

	if (!data) {
		return <></>;
	}

	return (
		<div className="m-4 flex flex-row justify-center items-center">
			<FormProvider {...methods}>
				<div>
					<form className="flex flex-col justify-center items-center">
						{chartProps.map(select => (
							<ChartSelect id={select.id} options={select.options} label={select.label} />
						))}
					</form>
					<div>
						<InputRange
							label="Distance"
							id={{ from: 'distanceFrom', to: 'distanceTo' }}
							placeholder={{ from: 'from km', to: 'to km' }}
							type="text"
						/>
					</div>
				</div>
			</FormProvider>

			<div className="flex justify-center items-center w-1/2">
				<Chart
					data={data.getActivities}
					x={methods.getValues().x}
					y1={methods.getValues().y1}
					y2={methods.getValues().y2}
				/>
			</div>
		</div>
	);
};
