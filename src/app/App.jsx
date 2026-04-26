import { Suspense } from "react";
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
      <Suspense fallback={null}>
        {/* Data router: required for route loaders, errorElement, useNavigation, useLoaderData */}
        <RouterProvider router={router} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
