import { Outlet } from "react-router";

export default function Root() {
  return (
    <div className="root-layout">
      <Outlet />
    </div>
  );
}
