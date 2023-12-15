import React from 'react';
import { format } from '../../utils/utils';
import { BsFillCaretUpFill, BsFillCaretDownFill } from 'react-icons/bs';
import { GQLActivity, useGetAcivityPageQuery } from '../../graphql';
import { activityType } from '../../utils/constants';

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
	const { data, loading, error } = useGetAcivityPageQuery({
		variables: {
			input: {
				first: 15,
			},
		},
	});
	if (data) {
		console.log(data.getActivityPage.edges.length);
		return <div>{data && data.getActivityPage.edges.map(activity => <div>{activity.start_date}</div>)}</div>;
	}
};

export default NewActivityTable;
