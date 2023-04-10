import { createBrowserRouter } from "react-router-dom";
import Login from "./components/auth/Login";
import NotFoundPage from "./error-page/NotFoundPage";
import Register from "./components/auth/Register";
// import Home from "./components/layout/Home";
import PostsList from "./components/posts/PostsList";
import ProtectedComponent from "./components/ProtectedComponent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/home",
    element: <ProtectedComponent />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/home/posts",
        element: <PostsList />,
      },
    ],
  },
]);

export default router;
