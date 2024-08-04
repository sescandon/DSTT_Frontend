import { createBrowserRouter, Navigate } from "react-router-dom";
import MainPage from "./presentation/pages/MainPage";
import Dashboard from "./presentation/pages/Dashboard";

export const applicationRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
