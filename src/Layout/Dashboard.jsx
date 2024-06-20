import { FaHome } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import DarkModeToggle from "../DarkModeToggle";

const Dashboard = () => {

    const navbarList = <>
        <li>
            <NavLink className={({ isActive }) => isActive ? 'text-myBg-dark dark:bg-myBg-dark dark:text-myBgTheme-light' : ''} to='/dashboard/userHome'>
                <FaHome />
                User Home
            </NavLink>
        </li>
    </>

    return (
        <div className="flex">
            <div className="w-64 hidden lg:inline-block min-h-screen bg-myBgTheme-white dark:bg-myText-mediumDark shadow-xl rounded-r-xl">
                <div className="flex justify-end mr-4 mt-4">
                    <DarkModeToggle />
                </div>
                <div className="hidden lg:flex">
                    <ul className="menu p-4 text-xl uppercase font-myFont font-bold text-myText-highDark dark:text-myText-highLight space-x-3 w-full">
                        {navbarList}
                    </ul>
                </div>
            </div>
            <div className="flex-1 p-8">
                <div className="flex justify-between">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="lg:hidden btn btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-lg dropdown-content -ml-8 z-[1] p-2 dark:bg-myBgTheme-dark w-72 uppercase text-myText-highDark dark:text-myText-highLight font-bold text-base space-y-3 bg-myBgTheme-white border-myBg-dark border-y-4 rounded-r-3xl">
                            {navbarList}
                        </ul>
                    </div>
                    <div className="flex lg:hidden">
                        <DarkModeToggle />
                    </div>
                </div>
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;