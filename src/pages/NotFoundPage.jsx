/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import { NavLink } from "react-router-dom";
import Button from "../components/Button";

function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="grow flex items-center justify-center mt-17 px-6 pt-10">
        <div className="flex flex-col items-center text-center max-w-xl">
          <h1 className="text-7xl md:text-8xl font-bold text-[rgb(var(--color-text-main))]">
            404
          </h1>

          <h2 className="text-xl md:text-2xl font-semibold mt-4 text-[rgb(var(--color-text-main))]">
            Page not found
          </h2>

          <p className="text-[rgb(var(--color-text-main-1))] mt-3">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>

          <NavLink to="/">
            <Button className="m-5">Go back to home</Button>
          </NavLink>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default NotFoundPage;
