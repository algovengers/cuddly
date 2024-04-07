import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import Discover from "./pages/discover";
import Upload from "./pages/upload";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/explore",
    element : <Discover />
  },
  {
    path : '/upload',
    element : <Upload />
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
