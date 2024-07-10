import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useParams, useSearchParams } from "react-router-dom";
import L from "leaflet";
import { MARKER_ICON } from "../util/constants";

const customMarkerIcon = L.icon({
  iconUrl: MARKER_ICON,
  iconSize: [40, 40],
  iconAnchor: [12, 12],
  popupAnchor: [0, 0],
});

function Map() {
  const { id: countryName } = useParams();

  const [searchParams] = useSearchParams();
  const latLng = searchParams.get("latlng") as string;
  const [lat, lng] = latLng.split(",").map((string) => Number(string));

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={5}
      scrollWheelZoom={true}
      className="h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]} icon={customMarkerIcon}>
        <Popup>{countryName}</Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;
