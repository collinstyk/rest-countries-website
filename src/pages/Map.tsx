import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useParams, useSearchParams } from "react-router-dom";

function Map() {
  const { id: countryName } = useParams();

  const [searchParams] = useSearchParams();
  const latLng = searchParams.get("latlng") as string;
  const [lat, lng] = latLng.split(",").map((string) => Number(string));

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={6}
      scrollWheelZoom={true}
      className="h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]}>
        <Popup>{countryName}</Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;
