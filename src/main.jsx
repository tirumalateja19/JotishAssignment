import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AuthProvider from "./components/context/contextApi.jsx";
import ProtectedRoute from "./components/auth/ProtectedRouting.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./components/auth/login.jsx";
import Dashboard from "./components/pages/Dashboard.jsx";

const appRouter = createBrowserRouter([
  { path: "/", element: <Login /> },
  {
    path: "/details",
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
