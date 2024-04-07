import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
