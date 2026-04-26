import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import AdminLayout from "../layout/AdminLayout";
import ProtectedRoute from "../routes/ProtectedRoute";
import AdminRoute from "../routes/AdminRoute";
import RouteErrorUI from "./RouteErrorUI";

/** Default export → RR `lazy` route module */
const page = (importer) =>
  importer().then((m) => ({ Component: m.default }));

/**
 * Declarative JSX routes (same shape as `<Routes>` / `<Route>`).
 * Wrapped with `createBrowserRouter` so loaders, `errorElement`, `useNavigation`,
 * `useLoaderData`, and `useRevalidator` keep working — plain `<BrowserRouter>`
 * cannot run route loaders or those hooks.
 *
 * `RouterProvider` stays in `App.jsx` (required for this API).
 */
export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={<MainLayout />}
        errorElement={<RouteErrorUI />}
      >
        <Route index lazy={() => page(() => import("../pages/HomePage"))} />
        <Route
          path="search"
          lazy={() => page(() => import("../pages/ProductsPage"))}
        />
        <Route
          path="products/:productId"
          lazy={() => page(() => import("../pages/ProductDetailPage"))}
        />
        <Route path="about" lazy={() => page(() => import("../pages/AboutPage"))} />
        <Route
          path="contact"
          lazy={() => page(() => import("../pages/ContactPage"))}
        />
        <Route path="login" lazy={() => page(() => import("../pages/LoginPage"))} />
        <Route
          path="register"
          lazy={() => page(() => import("../pages/RegisterPage"))}
        />
        <Route path="TOS" lazy={() => page(() => import("../pages/TOSPage.jsx"))} />
        <Route path="FAQ" lazy={() => page(() => import("../pages/FAQPage.jsx"))} />
        <Route
          path="Privacy&Policy"
          lazy={() => page(() => import("../pages/PrivacyPage.jsx"))}
        />

        <Route element={<ProtectedRoute />}>
          <Route path="cart" lazy={() => page(() => import("../pages/CartPage"))} />
          <Route
            path="wishlist"
            lazy={() => page(() => import("../pages/WishlistPage"))}
          />
          <Route
            path="account"
            lazy={() => page(() => import("../pages/account/AccountLayout"))}
          >
            <Route index element={<Navigate to="profile" replace />} />
            <Route
              path="profile"
              lazy={() =>
                page(() => import("../features/account/ProfilePage.jsx"))
              }
            />
            <Route
              path="address"
              lazy={() =>
                page(() => import("../features/account/AddressPage.jsx"))
              }
            />
            <Route
              path="progress"
              lazy={() =>
                page(() => import("../features/account/ProgressPage.jsx"))
              }
            />
            <Route
              path="arrived"
              lazy={() =>
                page(() => import("../features/account/ArrivedPage.jsx"))
              }
            />
            <Route
              path="cancelled"
              lazy={() =>
                page(() => import("../features/account/CancelledPage.jsx"))
              }
            />
          </Route>
        </Route>
      </Route>

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
        errorElement={<RouteErrorUI showLayout={true} />}
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route
          path="dashboard"
          lazy={() => page(() => import("../pages/admin/Dashboard.jsx"))}
        />
        <Route
          path="products"
          lazy={() =>
            page(() => import("../pages/admin/managements/Products.jsx"))
          }
        />
        <Route
          path="categories"
          lazy={async () => {
            const [{ default: Component }, { getCategories }] =
              await Promise.all([
                import("../pages/admin/managements/Category.jsx"),
                import("../features/admin/categories/api/getCategories.js"),
              ]);
            return { Component, loader: getCategories };
          }}
        />
        <Route
          path="orders"
          lazy={async () => {
            const [{ default: Component }, { getOrders }] = await Promise.all([
              import("../pages/admin/managements/Orders.jsx"),
              import("../features/admin/orders/api/getOrders"),
            ]);
            return { Component, loader: getOrders };
          }}
        />
        <Route
          path="users"
          lazy={async () => {
            const [{ default: Component }, { getUsers }] = await Promise.all([
              import("../pages/admin/managements/Users.jsx"),
              import("../features/admin/users/api/getUsers.js"),
            ]);
            return { Component, loader: getUsers };
          }}
        />
        <Route
          path="staff"
          lazy={async () => {
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
          }}
        />
        <Route
          path="coupons"
          lazy={async () => {
            const [{ default: Component }, { getCoupone }] = await Promise.all([
              import("../pages/admin/marketing/Coupons.jsx"),
              import("../features/admin/coupon/api/getCoupone.js"),
            ]);
            return { Component, loader: getCoupone };
          }}
        />
        <Route
          path="discounts"
          lazy={async () => {
            const [{ default: Component }, { getProductsWithFilters }] =
              await Promise.all([
                import("../pages/admin/marketing/Discounts.jsx"),
                import(
                  "../features/admin/discount/api/getProductsWithFilters.js"
                ),
              ]);
            return { Component, loader: getProductsWithFilters };
          }}
        />
        <Route
          path="contacts"
          lazy={async () => {
            const [{ default: Component }, { getContacts }] =
              await Promise.all([
                import("../pages/admin/content/Contacts.jsx"),
                import("../features/admin/contact/getContacts.js"),
              ]);
            return { Component, loader: getContacts };
          }}
        />
      </Route>

      <Route path="*" lazy={() => page(() => import("../pages/NotFoundPage"))} />
    </>,
  ),
);
