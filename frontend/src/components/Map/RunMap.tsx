import React from 'react';
import { format } from '../../utils/utils';
import { MapContainer, TileLayer, Popup, Polyline } from 'react-leaflet';
import './RunMap.css';
import polyline from '@mapbox/polyline';
import { GQLActivity } from '../../graphql';
import { activityType } from '../../utils/constants';

type label = {
	label: string;
	type: 'avg' | 'sum' | 'none';
};

const mapStats: { [key in keyof activityType]: label } = {
	distance: { label: 'Distance', type: 'sum' },
	elapsed_time: { label: 'Time', type: 'sum' },
	average_heartrate: { label: 'Average Heartrate', type: 'avg' },
	average_cadence: { label: 'Average Cadence', type: 'avg' },
	start_date: { label: 'Date', type: 'none' },
	zone: { label: 'Zone', type: 'none' },
	average_pace: { label: 'Average Pace', type: 'avg' },
};

const RunMap: React.FunctionComponent<{ activity: GQLActivity | undefined }> = ({ activity }) => {
	if (!activity) {
		return <div></div>;
	}

	const pline = polyline.decode(activity.summary_polyline);

	const keys = (Object.keys(activity) as (keyof activityType)[]).filter(key => {
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
									<div key={key}>{mapStats[key].label + ' : ' + format(key, activity[key])}</div>
								)
						)}
					</Popup>
				</Polyline>
			</MapContainer>
		</div>
	);
};

export default RunMap;
