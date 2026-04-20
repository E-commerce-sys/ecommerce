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
import CancelledPage from "../features/account/CancelledPage.jsx";

import Dashboard from "../pages/admin/Dashboard.jsx";
import Products from "../pages/admin/managements/Products.jsx";
import Category from "../pages/admin/managements/Category.jsx";
import Orders from "../pages/admin/managements/Orders.jsx";
import Users from "../pages/admin/managements/Users.jsx";
import Staff from "../pages/admin/managements/Staff.jsx";
import Coupons from "../pages/admin/marketing/Coupons.jsx";
import Discounts from "../pages/admin/marketing/Discounts.jsx";
import Contacts from "../pages/admin/content/Contacts.jsx";
import Reports from "../pages/admin/analytics/Reports.jsx";

import NotFoundPage from "../pages/NotFoundPage";

// Route Guards
import ProtectedRoute from "../routes/ProtectedRoute";
import AdminRoute from "../routes/AdminRoute";
import TOSPage from "../pages/TOSPage.jsx";
import FAQPage from "../pages/FAQPage.jsx";
import PrivacyPage from "../pages/PrivacyPage.jsx";
import RouteErrorUI from "./RouteErrorUI";

import { getCategories } from "../features/admin/categories/api/getCategories.js";
import { getOrders } from "../features/admin/orders/api/getOrders";
import { getProductsWithFilters } from "../features/admin/discount/api/getProductsWithFilters.js";
import { getContacts } from "../features/admin/contact/getContacts.js";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <RouteErrorUI />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },

      { path: "search", element: <ProductsPage /> },
      { path: "products/:productId", element: <ProductDetailPage /> },

      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },

      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
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
              { path: "cancelled", element: <CancelledPage /> },
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
      { index: true, element: <Navigate to="/admin/dashboard" replace /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "products", element: <Products /> },
      {
        path: "categories",
        element: <Category />,
        loader: getCategories,
      },
      { path: "orders", element: <Orders />, loader: getOrders },
      { path: "users", element: <Users /> },
      { path: "staff", element: <Staff /> },
      { path: "coupons", element: <Coupons /> },
      {
        path: "discounts",
        element: <Discounts />,
        loader: getProductsWithFilters,
      },
      { path: "contacts", element: <Contacts />, loader: getContacts },
      { path: "reports", element: <Reports /> },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
