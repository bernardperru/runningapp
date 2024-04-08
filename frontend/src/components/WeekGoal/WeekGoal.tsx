import { useGetWeeklyGoalQuery } from '../../graphql';
import { getCurrentWeekAndYear } from '../../utils';

export function WeekGoal() {
	//fetch from database
	const { data } = useGetWeeklyGoalQuery({ variables: getCurrentWeekAndYear() });

	if (!data) {
		return 'no data found';
	}
	return (
		<div>
			<h2>Weekly Goal</h2>
			{data.getWeeklyGoal.currentDistance} km / {data.getWeeklyGoal.goalDistance} km
		</div>
	);
}
