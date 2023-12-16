import React from 'react';
import { format } from '../../utils/utils';
import { BsFillCaretUpFill, BsFillCaretDownFill } from 'react-icons/bs';
import { GQLActivity, GQLGetAcivityPageQuery, useGetAcivityPageQuery } from '../../graphql';
import { activityType } from '../../utils/constants';
import { NetworkStatus } from '@apollo/client';

const labels: { [key in keyof activityType]: string } = {
	start_date: 'Date',
	distance: 'Distance',
	elapsed_time: 'Time',
	average_heartrate: 'Avg. Heartrate',
	average_cadence: 'Avg. Cadence',
	zone: 'Zone',
	average_pace: 'Avg. Pace',
};

const NewActivityTable: React.FunctionComponent = () => {
	const page = 0;
	const offset = 15;
	const { data, loading, error, networkStatus } = useGetAcivityPageQuery({
		variables: {
			input: {
				first: 15,
				offset: page * offset,
				order: 'desc',
				sort: 'distance',
			},
		},
		notifyOnNetworkStatusChange: true,
	});

	if (data) {
		console.log({ data });
		return (
			<div>
				{' '}
				<div>{data && data.getActivityPage.activities.map(activity => <div>{activity.distance}</div>)}</div>
				<div>{data.getActivityPage.count}</div>
			</div>
		);
	}
};

export default NewActivityTable;
