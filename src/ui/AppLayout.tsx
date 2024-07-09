import { Outlet } from "react-router-dom";
import Header from "./Header";

function AppLayout() {
  return (
    <div className="mx-auto min-h-dvh max-w-[1536px]">
      <Header />

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
