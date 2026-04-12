import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

/**
 * Keep <Outlet /> mounted during navigations. Replacing it with a full-page
 * spinner unmounted the whole route tree and caused extra mount/render cycles.
 * Show a lightweight loading indicator instead while loaders run.
 */
function MainLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      {isLoading ? (
        <div
          className="fixed top-0 right-0 left-0 z-[100] h-1 animate-pulse bg-[rgb(var(--color-primary-main))]"
          aria-hidden
        />
      ) : null}
      <main className="min-w-0 flex-1 overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
