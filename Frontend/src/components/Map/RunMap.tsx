import React from 'react';
import { format } from '../../funktioner';
import { MapContainer, TileLayer, Popup, Polyline } from 'react-leaflet';
import './RunMap.css';
import polyline from '@mapbox/polyline';
import { Activity } from '@/Activity';
import { useParams } from 'react-router-dom';

type label = {
	label: string;
	type: 'avg' | 'sum' | 'none';
};

const mapStats: { [key in keyof Activity]: label } = {
	distance: { label: 'Distance', type: 'sum' },
	elapsed_time: { label: 'Time', type: 'sum' },
	average_heartrate: { label: 'Average Heartrate', type: 'avg' },
	average_cadence: { label: 'Average Cadence', type: 'avg' },
	id: { label: 'Id', type: 'none' },
	start_date: { label: 'Date', type: 'none' },
	week: { label: 'Week', type: 'none' },
	zone: { label: 'Zone', type: 'none' },
	map: { label: 'Map', type: 'none' },
};

const RunMap: React.FunctionComponent<{ activities: Activity[] }> = ({ activities }) => {
	let { weekNumber, activityId } = useParams();

	let activity = activities.filter(activity => {
		return activity.id.toString() === activityId;
	});

	const pline = polyline.decode(activity[0]['map']['summary_polyline']);

	const keys = (Object.keys(activity) as (keyof Activity)[]).filter(key => {
		return mapStats[key];
	});

	return (
		<div id="map">
			<MapContainer center={pline[0]} zoom={13} scrollWheelZoom={false}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Polyline positions={pline}>
					<Popup>
						{keys.map(
							key =>
								mapStats[key].type !== 'none' && (
									<div key={key}>{mapStats[key].label + ' : ' + format(key, activity[0][key])}</div>
								)
						)}
					</Popup>
				</Polyline>
			</MapContainer>
		</div>
	);
};

export default RunMap;
