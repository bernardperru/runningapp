import { useState } from 'react';
import { useChangeWeeklyGoalMutation, useGetWeeklyGoalQuery } from '../../graphql';
import { getCurrentWeekAndYear } from '../../utils';

export function WeekGoal() {
	//fetch from database
	const [weekGoal, setWeekGoal] = useState(20);
	const { data, refetch } = useGetWeeklyGoalQuery({ variables: getCurrentWeekAndYear() });
	const [changeGoal] = useChangeWeeklyGoalMutation({
		variables: {
			goal: weekGoal,
		},
		onCompleted: () => refetch(),
	});

	if (!data) {
		console.log(data);
		return 'no data found';
	}

	return (
		<div className="border border-black">
			{getCurrentWeekAndYear().week}
			<h2>Weekly Goal</h2>
			{(data.getWeeklyGoal.distance / 1000).toFixed(0)} km / {data.getWeeklyGoal.goal} km
			<input
				className="pointer button"
				type="number"
				value={weekGoal}
				onChange={e => setWeekGoal(parseFloat(e.target.value))}
			/>
			<button
				className="pointer mr2 button"
				onClick={() => {
					changeGoal();
				}}>
				click here
			</button>
		</div>
	);
}
