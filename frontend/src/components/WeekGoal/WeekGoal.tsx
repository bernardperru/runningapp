import { useGetWeeklyGoalQuery } from '../../graphql';
import { getCurrentWeekAndYear } from '../../utils';

export function WeekGoal() {
	//fetch from database
	const { data } = useGetWeeklyGoalQuery({ variables: getCurrentWeekAndYear() });

	if (!data) {
		console.log(data);
		return 'no data found';
	}

	return (
		<div className="border border-black">
			<h2>Weekly Goal</h2>
			{(data.getWeeklyGoal.currentDistance / 1000).toFixed(0)} km / {data.getWeeklyGoal.goalDistance} km
		</div>
	);
}
