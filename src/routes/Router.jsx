import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Products from "../pages/Products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      // This will catch any undefined routes
      {
        path: "*",
        element: <div>404 - Page Not Found</div>,
      },
    ],
  },
]);

export default router;
