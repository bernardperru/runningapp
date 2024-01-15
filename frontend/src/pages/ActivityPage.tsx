import { GQLActivity } from '../graphql';
import { useLocation } from 'react-router-dom';

interface Props {
	activity?: GQLActivity;
}

export function ActivityPage() {
	const location = useLocation();
	console.log(location.state);

	if (location.state) {
		return <div>no activity found</div>;
	}

	return <div>{}</div>;
}
