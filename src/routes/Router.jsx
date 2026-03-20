import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Test from "../pages/Test";

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
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "test",
    element:<Test/>
  }
]);

export default router;
