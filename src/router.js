import { createBrowserRouter } from "react-router-dom";
import Login from "./components/auth/Login";
import NotFoundPage from "./error-page/NotFoundPage";
import Register from "./components/auth/Register";
import Home from "./components/layout/Home";
import Profile from "./components/profile/Profile";
import ProfileTab from "./components/profile/ProfileTab";
import Posts from "./components/posts/Posts";
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
    element: <Home />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/home/posts",
        element: <Posts />,
      },
      {
        path: "/home/profile",
        element: <ProfileTab />,
      },
    ],
  },
]);

export default router;
