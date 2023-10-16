import React from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  Popup,
  Marker,
  Polyline,
} from "react-leaflet";
import "./RunMap.css";
import polyline from "@mapbox/polyline";
function RunMap({ activities }) {
  const pline = polyline.decode(activities[0]["map"]["summary_polyline"]);

  return (
    <div id="map">
      <MapContainer
        center={[55.25377, 9.48982]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline positions={pline}></Polyline>
      </MapContainer>
    </div>
  );
}

export default RunMap;
