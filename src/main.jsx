/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/theme.css";
import App from "./app/App";

import { LanguageProvider } from "./context/LanguageContext.jsx";
import { AuthProvider } from "./context/AuthContext";
import { CategoryProvider } from "./context/CategoryContext";
import { CartProvider } from "./context/CartContext.jsx";
import { UserProvider } from "./context/ProfileContext.jsx";
import { AddressProvider } from "./context/AddressContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <LanguageProvider>
        <UserProvider>
          <AddressProvider>
        <CategoryProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </CategoryProvider>
        </AddressProvider>
        </UserProvider>
      </LanguageProvider>
    </AuthProvider>
  </StrictMode>,
);
