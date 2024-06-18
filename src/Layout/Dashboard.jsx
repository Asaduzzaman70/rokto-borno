import { FaHome } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import DarkModeToggle from "../DarkModeToggle";

const Dashboard = () => {
    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-myBgTheme-white dark:bg-myText-mediumDark shadow-xl rounded-r-xl">
                <div className="flex justify-end mr-4 mt-4">
                    <DarkModeToggle />
                </div>
                <ul className="menu p-4 text-xl uppercase font-myFont font-bold text-myText-highDark dark:text-myText-highLight space-x-3">
                    <li>
                        <NavLink className={({ isActive }) => isActive ? 'text-myBg-dark dark:bg-myBg-dark dark:text-myBgTheme-light' : ''} to='/dashboard/userHome'>
                            <FaHome />
                            User Home
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex-1 p-8">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;