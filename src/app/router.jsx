/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { createBrowserRouter, Navigate } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import AdminLayout from "../layout/AdminLayout";

import HomePage from "../pages/HomePage";
import ProductsPage from "../pages/ProductsPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import CartPage from "../pages/CartPage";
import WishlistPage from "../pages/WishlistPage";
import AccountLayout from "../pages/account/AccountLayout";
import ProfilePage from "../features/account/ProfilePage.jsx";
import AddressPage from "../features/account/AddressPage.jsx";
import ProgressPage from "../features/account/ProgressPage.jsx";
import ArrivedPage from "../features/account/ArrivedPage.jsx";
import CanceledPage from "../features/account/CanceledPage.jsx";

import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminProductsPage from "../pages/admin/AdminProductsPage";
import AdminCategoriesPage from "../pages/admin/AdminCategoriesPage";
import AdminOrdersPage from "../pages/admin/AdminOrdersPage";
import AdminAdsPage from "../pages/admin/AdminAdsPage";

import NotFoundPage from "../pages/NotFoundPage";
import { homeLoader } from "../features/home/homeLoader.js";

// Route Guards
import ProtectedRoute from "../routes/ProtectedRoute";
import AdminRoute from "../routes/AdminRoute";
import TOSPage from "../pages/TOSPage.jsx";
import FAQPage from "../pages/FAQPage.jsx";
import PrivacyPage from "../pages/PrivacyPage.jsx";
import RouteErrorUI from "./RouteErrorUI";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <RouteErrorUI />,
    children: [
      {
        index: true,
        loader: homeLoader,
        element: <HomePage />,
      },

      { path: "products", element: <ProductsPage /> },
      { path: "products/:productId", element: <ProductDetailPage /> },

      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },

      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "register/verify", element: <RegisterPage /> },
      { path: "TOS", element: <TOSPage /> },
      { path: "FAQ", element: <FAQPage /> },
      { path: "Privacy&Policy", element: <PrivacyPage /> },

      {
        element: <ProtectedRoute />,
        children: [
          { path: "cart", element: <CartPage /> },
          { path: "wishlist", element: <WishlistPage /> },
          // { path: "checkout", element: <CheckoutPage /> },

          {
            path: "account",
            element: <AccountLayout />,
            children: [
              { index: true, element: <Navigate to="profile" replace /> },
              { path: "profile", element: <ProfilePage /> },
              { path: "address", element: <AddressPage /> },
              { path: "progress", element: <ProgressPage /> },
              { path: "arrived", element: <ArrivedPage /> },
              { path: "canceled", element: <CanceledPage /> },
            ],
          },
        ],
      },
    ],
  },

  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    errorElement: <RouteErrorUI showLayout={true} />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "products", element: <AdminProductsPage /> },
      { path: "categories", element: <AdminCategoriesPage /> },
      { path: "orders", element: <AdminOrdersPage /> },
      { path: "ads", element: <AdminAdsPage /> },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
