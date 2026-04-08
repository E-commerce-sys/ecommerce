/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import "./styles/theme.css";
import App from "./app/App";

import { LanguageProvider } from "./context/LanguageContext.jsx";
import { AuthProvider } from "./context/AuthContext";
import { CategoryProvider } from "./context/CategoryContext";
import { CartProvider } from "./context/CartContext.jsx";
import { UserProvider } from "./context/ProfileContext.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cached page remains fresh so back/forward pagination uses cache.
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <UserProvider>
            <CategoryProvider>
              <CartProvider>
                <App />
              </CartProvider>
            </CategoryProvider>
          </UserProvider>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
