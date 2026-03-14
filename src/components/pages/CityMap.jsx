import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const CityMap = ({ data }) => {
  const cityCoordinates = {
    Edinburgh: [55.9533, -3.1883],
    Tokyo: [35.6762, 139.6503],
    London: [51.5072, -0.1276],
    Singapore: [1.3521, 103.8198],
    Sydney: [-33.8688, 151.2093],
  };

  if (!data || !Array.isArray(data)) {
    return <p>No data available for the map.</p>;
  }

  const cities = [...new Set(data.map((row) => row[2]))];

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: "400px", width: "600px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {cities.map((city) => {
        const coords = cityCoordinates[city];
        if (!coords) return null;

        return (
          <Marker key={city} position={coords}>
            <Popup>{city}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default CityMap;
