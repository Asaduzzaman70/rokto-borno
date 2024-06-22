import {
    createBrowserRouter
} from "react-router-dom";
import Main from "../Layout/Main";
import HomeLayout from "../Pages/Home/HomeLayout/HomeLayout";
import Register from "../Components/Authentication/Register/Register";
import Login from "../Components/Authentication/Login/Login";
import Dashboard from "../Layout/Dashboard";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import PrivateRoute from "./PrivateRoute";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import EditDonation from "../Components/DashboardComponents/EditDonation/EditDonation";
import ViewDetails from "../Components/DashboardComponents/ViewDetails/ViewDetails";
import MyDonationRequests from "../Components/DashboardComponents/MyDonationRequests/MyDonationRequests";
import CreateDonationReq from "../Pages/Dashboard/CreateDonationReq/CreateDonationReq";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: '/',
                element: <HomeLayout />
            },
            {
                path: 'register',
                element: <Register />
            },
            {
                path: 'login',
                element: <Login />
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
            // normal user routes
            {
                path: 'userHome',
                element: <DashboardHome />
            },
            {
                path: 'profile',
                element: <UserHome />
            },
            {
                path: 'userHome/editDonation/:id',
                element: <EditDonation />
            },
            {
                path: 'userHome/viewDetails/:id',
                element: <ViewDetails />
            },
            {
                path: 'userHome/myDonationRequests',
                element: <MyDonationRequests />
            },
            {
                path: 'createDonationReq',
                element: <CreateDonationReq/>
            }
        ]
    }
]);