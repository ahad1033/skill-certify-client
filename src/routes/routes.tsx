import App from "@/App";
import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";
import QuizInterface from "@/pages/QuizInterface";
import ProtectedRoute from "@/components/ProtectedRoute";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "quiz",
        element: <ProtectedRoute role="user" />,
        children: [
          {
            index: true,
            element: <QuizInterface />,
          },
        ],
      },
    ],
  },
]);

export default router;
