import { createBrowserRouter, Navigate } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import AdminLayout from "../layout/AdminLayout";
import ProtectedRoute from "../routes/ProtectedRoute";
import AdminRoute from "../routes/AdminRoute";
import RouteErrorUI from "./RouteErrorUI";

/** Default export → RR `lazy` route module */
const page = (importer) =>
  importer().then((m) => ({ Component: m.default }));

/**
 * Route-based code splitting: avoid static imports of every page + admin loader
 * in this file. Otherwise the first load (e.g. `/` or `/admin`) pulls one large
 * JS graph — Network shows “the other side’s” chunk even though those loaders
 * only run when their path matches.
 */
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <RouteErrorUI />,
    children: [
      { index: true, lazy: () => page(() => import("../pages/HomePage")) },
      {
        path: "search",
        lazy: () => page(() => import("../pages/ProductsPage")),
      },
      {
        path: "products/:productId",
        lazy: () => page(() => import("../pages/ProductDetailPage")),
      },
      { path: "about", lazy: () => page(() => import("../pages/AboutPage")) },
      {
        path: "contact",
        lazy: () => page(() => import("../pages/ContactPage")),
      },
      { path: "login", lazy: () => page(() => import("../pages/LoginPage")) },
      {
        path: "register",
        lazy: () => page(() => import("../pages/RegisterPage")),
      },
      { path: "TOS", lazy: () => page(() => import("../pages/TOSPage.jsx")) },
      { path: "FAQ", lazy: () => page(() => import("../pages/FAQPage.jsx")) },
      {
        path: "Privacy&Policy",
        lazy: () => page(() => import("../pages/PrivacyPage.jsx")),
      },

      {
        element: <ProtectedRoute />,
        children: [
          { path: "cart", lazy: () => page(() => import("../pages/CartPage")) },
          {
            path: "wishlist",
            lazy: () => page(() => import("../pages/WishlistPage")),
          },
          {
            path: "account",
            lazy: () =>
              page(() => import("../pages/account/AccountLayout")),
            children: [
              { index: true, element: <Navigate to="profile" replace /> },
              {
                path: "profile",
                lazy: () =>
                  page(() => import("../features/account/ProfilePage.jsx")),
              },
              {
                path: "address",
                lazy: () =>
                  page(() => import("../features/account/AddressPage.jsx")),
              },
              {
                path: "progress",
                lazy: () =>
                  page(() => import("../features/account/ProgressPage.jsx")),
              },
              {
                path: "arrived",
                lazy: () =>
                  page(() => import("../features/account/ArrivedPage.jsx")),
              },
              {
                path: "cancelled",
                lazy: () =>
                  page(() => import("../features/account/CancelledPage.jsx")),
              },
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
      {
        path: "dashboard",
        lazy: () => page(() => import("../pages/admin/Dashboard.jsx")),
      },
      {
        path: "products",
        lazy: () =>
          page(() => import("../pages/admin/managements/Products.jsx")),
      },
      {
        path: "categories",
        lazy: async () => {
          const [{ default: Component }, { getCategories }] =
            await Promise.all([
              import("../pages/admin/managements/Category.jsx"),
              import("../features/admin/categories/api/getCategories.js"),
            ]);
          return { Component, loader: getCategories };
        },
      },
      {
        path: "orders",
        lazy: async () => {
          const [{ default: Component }, { getOrders }] = await Promise.all([
            import("../pages/admin/managements/Orders.jsx"),
            import("../features/admin/orders/api/getOrders"),
          ]);
          return { Component, loader: getOrders };
        },
      },
      {
        path: "users",
        lazy: async () => {
          const [{ default: Component }, { getUsers }] = await Promise.all([
            import("../pages/admin/managements/Users.jsx"),
            import("../features/admin/users/api/getUsers.js"),
          ]);
          return { Component, loader: getUsers };
        },
      },
      {
        path: "staff",
        lazy: async () => {
          const [{ default: Staff }, { default: SuperAdminRoute }] =
            await Promise.all([
              import("../pages/admin/managements/Staff.jsx"),
              import("../routes/SuperAdminRoute.jsx"),
            ]);
          function StaffGate() {
            return (
              <SuperAdminRoute>
                <Staff />
              </SuperAdminRoute>
            );
          }
          return { Component: StaffGate };
        },
      },
      {
        path: "coupons",
        lazy: async () => {
          const [{ default: Component }, { getCoupone }] = await Promise.all([
            import("../pages/admin/marketing/Coupons.jsx"),
            import("../features/admin/coupon/api/getCoupone.js"),
          ]);
          return { Component, loader: getCoupone };
        },
      },
      {
        path: "discounts",
        lazy: async () => {
          const [{ default: Component }, { getProductsWithFilters }] =
            await Promise.all([
              import("../pages/admin/marketing/Discounts.jsx"),
              import(
                "../features/admin/discount/api/getProductsWithFilters.js"
              ),
            ]);
          return { Component, loader: getProductsWithFilters };
        },
      },
      {
        path: "contacts",
        lazy: async () => {
          const [{ default: Component }, { getContacts }] =
            await Promise.all([
              import("../pages/admin/content/Contacts.jsx"),
              import("../features/admin/contact/getContacts.js"),
            ]);
          return { Component, loader: getContacts };
        },
      },
    ],
  },

  {
    path: "*",
    lazy: () => page(() => import("../pages/NotFoundPage")),
  },
]);
