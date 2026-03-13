import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AuthProvider from "./components/context/contextApi.jsx";
import ProtectedRoute from "./components/auth/ProtectedRouting.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./components/auth/login.jsx";
import Dashboard from "./components/pages/Dashboard.jsx";
import List from "./components/pages/List.jsx";
import Details from "./components/pages/Details.jsx";

const appRouter = createBrowserRouter([
  { path: "/", element: <Login /> },
  {
    path: "/list",
    element: (
      <ProtectedRoute>
        <List />
      </ProtectedRoute>
    ),
  },
  {
    path: "/details/:id",
    element: (
      <ProtectedRoute>
        <Details />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={appRouter} />
    </AuthProvider>
  </StrictMode>,
);
