import React from "react";
import { MapContainer, TileLayer, useMap, Popup, Marker } from "react-leaflet";
import "./RunMap.css";
function RunMap() {
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
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default RunMap;
