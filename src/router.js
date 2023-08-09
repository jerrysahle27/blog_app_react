import { createBrowserRouter } from "react-router-dom";
import Login from "./components/auth/Login";
import NotFoundPage from "./error-page/NotFoundPage";
import Register from "./components/auth/Register";
// import Home from "./components/layout/Home";
// import ProfileTab from "./components/profile/ProfileTab";
// import Posts from "./components/posts/Posts";
import ForgotPassword from "./components/auth/ForgotPassword";
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword />,
    errorElement: <NotFoundPage />,
  },
]);

export default router;
