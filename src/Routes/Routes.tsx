import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";

export const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        errorElement: <ErrorPage />,
    },
    {
        path:'/login',
        element:<Login/>,
    },
    {
        path:'/home',
        element:<HomePage/>,
    },
])