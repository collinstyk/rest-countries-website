import Map from "../pages/Map";
import Sidebar from "./Sidebar";

function MapLayout() {
  return (
    <div className="h-dvh w-full">
      <Sidebar />
      <Map />
    </div>
  );
}

export default MapLayout;
