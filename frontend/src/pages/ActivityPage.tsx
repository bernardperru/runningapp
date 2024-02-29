import { useLocation } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

export function ActivityPage() {
	const activityId = useOutletContext();
	const location = useLocation();
	console.log(location.state);

	if (location.state) {
		return <div></div>;
	}

	return <div></div>;
}
