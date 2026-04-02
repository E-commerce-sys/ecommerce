import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import Button from "./Button";

function AppErrorFallback({
  variant = "generic",
  showLayout = false,
  retryStrategy = "navigate", // "navigate" | "reload"
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  function handleGoBack() {
    const canGoBack = window.history.length > 1;
    if (canGoBack) {
      navigate(-1);
      return;
    }
    navigate("/", { replace: true });
  }

  function handleRetry() {
    if (retryStrategy === "reload") {
      window.location.reload();
      return;
    }

    // Re-run the loader for the current route.
    const to = `${location.pathname}${location.search}`;
    navigate(to, { replace: true });
  }

  const title = t(`errors.${variant}.title`);
  const message = t(`errors.${variant}.message`);
  const backLabel = t(`errors.${variant}.back`);
  const retryLabel = t(`errors.${variant}.retry`);

  const content = (
    <div className="flex flex-col items-center text-center max-w-xl">
      <h2 className="text-xl md:text-2xl font-semibold mt-4 text-[rgb(var(--color-text-main))]">
        {title}
      </h2>
      <p className="text-[rgb(var(--color-text-main-1))] mt-3">{message}</p>

      <div className="flex flex-col sm:flex-row items-center gap-3 mt-6">
        <Button variant="outline" onClick={handleGoBack} className="min-w-[180px]">
          {backLabel}
        </Button>
        <Button onClick={handleRetry} className="min-w-[180px]">
          {retryLabel}
        </Button>
      </div>
    </div>
  );

  if (!showLayout) {
    return <main className="grow flex items-center justify-center mt-17 px-6 pt-10">{content}</main>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="grow flex items-center justify-center mt-17 px-6 pt-10">
        {content}
      </main>
      <Footer />
    </div>
  );
}

export default AppErrorFallback;

