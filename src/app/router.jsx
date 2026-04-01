/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import AdminLayout from "../layout/AdminLayout";

// Pages
import HomePage from "../pages/HomePage";
import ProductsPage from "../pages/ProductsPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import WishlistPage from "../pages/WishlistPage";
import AccountLayout from "../pages/account/AccountLayout";
import ProfilePage from "../pages/account/ProfilePage";
import AddressPage from "../pages/account/AddressPage";
import ProgressPage from "../pages/account/ProgressPage";
import ArrivedPage from "../pages/account/ArrivedPage";
import CanceledPage from "../pages/account/CanceledPage";

import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminProductsPage from "../pages/admin/AdminProductsPage";
import AdminCategoriesPage from "../pages/admin/AdminCategoriesPage";
import AdminOrdersPage from "../pages/admin/AdminOrdersPage";
import AdminAdsPage from "../pages/admin/AdminAdsPage";

import NotFoundPage from "../pages/NotFoundPage";
import { homeLoader } from "../features/home/homeLoader.js";
import { productsLoader } from "../features/products/productsLoader.js";

// Route Guards
import ProtectedRoute from "../routes/ProtectedRoute";
import AdminRoute from "../routes/AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage />, loader: homeLoader },

      { path: "products", element: <ProductsPage />, loader: productsLoader },
      { path: "products/:productId", element: <ProductDetailPage /> },

      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },

      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "register/verify", element: <RegisterPage /> },

      {
        element: <ProtectedRoute />,
        children: [
          { path: "cart", element: <CartPage /> },
          { path: "checkout", element: <CheckoutPage /> },
          { path: "wishlist", element: <WishlistPage /> },
          // { path: "checkout", element: <CheckoutPage /> },

          {
            path: "account",
            element: <AccountLayout />,
            children: [
              { index: true, path: "profile", element: <ProfilePage /> },
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
