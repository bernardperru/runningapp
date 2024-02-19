import { useLocation } from 'react-router-dom';

export function ActivityPage() {
	const location = useLocation();
	console.log(location.state);

	if (location.state) {
		return <div>no activity found</div>;
	}

	return <div>{}</div>;
}
