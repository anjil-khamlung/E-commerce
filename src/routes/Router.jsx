import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Login from "../pages/Login";

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
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
]);

export default router;
