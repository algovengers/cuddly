import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import Discover from "./pages/discover";
import Upload from "./pages/upload";
import ChatWithAi from "./pages/ChatWithAi";
import store from "./redux/store";
import { Provider } from "react-redux";

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
    element: <Discover />,
  },
  {
    path: "/upload",
    element: <Upload />,
  },
  {
    path: "/chatwithai",
    element: <ChatWithAi />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
