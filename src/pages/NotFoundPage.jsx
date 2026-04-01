/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import { NavLink } from "react-router-dom";
import Button from "../components/Button";
import { useTranslation } from "react-i18next";

function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="grow flex items-center justify-center mt-17 px-6 pt-10">
        <div className="flex flex-col items-center text-center max-w-xl">
          <h2 className="text-xl md:text-2xl font-semibold mt-4 text-[rgb(var(--color-text-main))]">
            {t("notFound.title")}
          </h2>

          <p className="text-[rgb(var(--color-text-main-1))] mt-3">
            {t("notFound.message")}
          </p>

          <NavLink to="/">
            <Button className="m-5"> {t("notFound.back")}</Button>
          </NavLink>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default NotFoundPage;
