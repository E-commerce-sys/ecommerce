import { useRouteError } from "react-router-dom";

import AppErrorFallback from "../components/AppErrorFallback";

function isNetworkError(err) {
  if (!err) return false;

  const code = err?.code ? String(err.code) : "";
  const message = err?.message ? String(err.message).toLowerCase() : "";

  const networkCodes = new Set([
    "ERR_NETWORK",
    "ECONNABORTED",
    "ETIMEDOUT",
    "ENOTFOUND",
    "ECONNRESET",
  ]);

  if (networkCodes.has(code)) return true;

  const networkPhrases = [
    "network error",
    "failed to fetch",
    "network request failed",
    "timeout",
    "timed out",
    "internet",
    "ecconnreset",
    "enotfound",
  ];

  return networkPhrases.some((p) => message.includes(p));
}

function RouteErrorUI({ showLayout = false }) {
  const error = useRouteError();
  const variant = isNetworkError(error) ? "network" : "generic";

  return (
    <AppErrorFallback
      variant={variant}
      showLayout={showLayout}
      retryStrategy="navigate"
    />
  );
}

export default RouteErrorUI;
