import { Outlet } from "react-router";

function Layout() {
  return (
    <main className="min-h-dvh bg-btp">
      <Outlet />
    </main>
  );
}

export default Layout;
