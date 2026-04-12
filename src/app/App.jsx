import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import ErrorBoundary from "../components/ErrorBoundary";
import AppErrorFallback from "../components/AppErrorFallback";

function App() {
  return (
    <ErrorBoundary
      fallback={AppErrorFallback}
      fallbackProps={{
        variant: "generic",
        showLayout: true,
        retryStrategy: "reload",
      }}
    >
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;
