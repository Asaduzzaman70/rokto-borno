import {
    createBrowserRouter
} from "react-router-dom";
import Main from "../Layout/Main";
import HomeLayout from "../Pages/Home/HomeLayout/HomeLayout";
import Register from "../Components/Authentication/Register/Register";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        children: [
            {
                path: '/',
                element: <HomeLayout/>
            },
            {
                path: 'register',
                element: <Register/>
            }
        ]
    },
]);