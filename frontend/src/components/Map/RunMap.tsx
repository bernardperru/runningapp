import React from 'react';
import { formatDate } from '../../utils/utils';
import { MapContainer, TileLayer, Popup, Polyline } from 'react-leaflet';
import './RunMap.css';
import polyline from '@mapbox/polyline';
import { GQLActivity } from '../../graphql';

interface IMapData {
	key: keyof GQLActivity;
	render: (value: GQLActivity) => JSX.Element;
}

const mapData: IMapData[] = [
	{
		key: 'start_date',
		render: ({ start_date }) => {
			return <div>Date: {formatDate(start_date)}</div>;
		},
	},
	{
		key: 'distance',
		render: ({ distance }) => {
			return <div>Distance: {(distance / 1000).toFixed(2) + ' km'}</div>;
		},
	},
];

const RunMap: React.FunctionComponent<{ activity: GQLActivity }> = ({ activity }) => {
	const pline = polyline.decode(activity.summary_polyline);

	return (
		<div id="map">
			<MapContainer center={pline[0]} zoom={13} scrollWheelZoom={true}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Polyline positions={pline}>
					<Popup>{mapData.map(dataField => dataField.render(activity))}</Popup>
				</Polyline>
			</MapContainer>
		</div>
	);
};

export default RunMap;
