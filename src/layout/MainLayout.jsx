/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Spinner from "../components/Spinner";

function MainLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Page content */}
      <main className="min-w-0 flex-1 overflow-x-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center py-40">
            <Spinner />
          </div>
        ) : (
          <Outlet />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
