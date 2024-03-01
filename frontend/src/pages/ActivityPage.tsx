import { useLocation } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

export function ActivityPage() {
	const location = useLocation();

	if (location.state) {
		return <div></div>;
	}

	return <div></div>;
}
