import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import Discover from "./pages/discover";
import Upload from "./pages/upload";
import ChatWithAi from "./pages/ChatWithAi";
import store from "./redux/store";
import { Provider, useDispatch } from "react-redux";
import Home from "./pages/Home";
import { useEffect } from "react";
import axios from "axios";
import { setLoading, setUser } from "./redux/user";
import PetData from "./pages/PetData";

import Profile from "./pages/Profile";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
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
        handle: () => {
            console.log("hi");
        },
    },
    {
        path: "/pet/:id",
        element: <PetData />,
    },
    {
        path: "/discover",
        element: <Discover />,
    },
    {
        path: "/profile",
        element: <Profile />,
    },
]);

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_BACKEND_PATH}/api/isAuthenticated`, {
                withCredentials: true,
            })
            .then((res: any) => {
                console.log(res.data.data.emailId);
                dispatch(
                    setUser({
                        name: res.data?.data?.name,
                        email: res.data?.data?.emailId,
                    })
                );
            })
            .finally(() => {
                dispatch(setLoading({ isLoading: false }));
            });
    }, []);

    return <RouterProvider router={router} />;

}

export default App;
