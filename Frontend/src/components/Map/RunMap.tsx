import React from "react";
import { format } from "../../funktioner";
import { MapContainer, TileLayer, Popup, Polyline } from "react-leaflet";
import "./RunMap.css";
import polyline from "@mapbox/polyline";

function RunMap({ activity }) {
  const pline = polyline.decode(activity["map"]["summary_polyline"]);

  const mapStats = [
    {
      id: 1,
      key: "distance",
      label: "Distance",
    },
    {
      id: 2,
      key: "average_cadence",
      label: "Avg. Cadence",
    },
    {
      id: 3,
      key: "elapsed_time",
      label: "Time",
    },
    {
      id: 4,
      key: "average_heartrate",
      label: "Avg. Heartrate",
    },
  ];

  return (
    <div id="map">
      <MapContainer center={pline[0]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline positions={pline}>
          <Popup>
            {mapStats.map((stat) => (
              <div key={stat.id}>
                {stat.label + " : " + format(stat.key, activity[stat.key])}
              </div>
            ))}
          </Popup>
        </Polyline>
      </MapContainer>
    </div>
  );
}

export default RunMap;
