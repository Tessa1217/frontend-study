import Outlet from "@/router/Outlet";
import AppFooter from "@layout/AppFooter";
import AppHeader from "@layout/AppHeader";

function AppLayout() {
  return (
    <>
      <AppHeader />
      <main className="main-container">
        <Outlet />
      </main>
      <AppFooter />
    </>
  );
}

export default AppLayout;
