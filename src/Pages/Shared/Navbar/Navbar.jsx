import { Link, NavLink, useLocation } from "react-router-dom";
import logo from '../../../assets/Rokto borno logo.png'
import DarkModeToggle from "../../../DarkModeToggle";

const Navbar = () => {
    const location = useLocation();
    console.log(location);
    const listItem = <>
        <li>
            <NavLink className={({ isActive }) => isActive ? 'text-myBg-dark dark:bg-myBg-dark dark:text-myBgTheme-light' : ''} to='/'>Home</NavLink>
        </li>
        <li><NavLink to='/a'>donation requests</NavLink></li>
        <li><NavLink to='/b'>blog</NavLink></li>
        <li><NavLink to='/c'>funding</NavLink></li>
    </>

    return (
        <div className="shadow-2xl dark:bg-myBgTheme-dark bg-myBgTheme-white">
            <div className="navbar container mx-auto py-3 justify-between">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="lg:hidden btn btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-lg dropdown-content mt-7 z-[1] p-2 dark:bg-myBgTheme-dark bg-myBgTheme-white w-72 uppercase rounded-b-lg border-b-4 border-x-4 border-myBg-dark text-myText-highDark dark:text-myText-highLight font-bold text-base space-y-3">
                            {listItem}
                        </ul>
                    </div>
                    <Link to='/' className="h-full">
                        <img className="h-20" src={logo} alt="" />
                    </Link>
                </div>
                <div className="navbar-end hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-base uppercase font-myFont font-bold text-myText-highDark dark:text-myText-highLight space-x-3">
                        {listItem}
                    </ul>
                </div>
                <div className="ml-2">
                    <DarkModeToggle />
                    <div className="dropdown dropdown-end ml-4">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-12 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-lg dropdown-content mt-7 z-[1] p-2 shadow dark:bg-myBgTheme-dark bg-myBgTheme-white w-64 uppercase rounded-b-lg font-myFont font-bold text-base text-myText-highDark dark:text-myText-highLight border-b-4 border-x-4 border-myBg-dark space-y-3">
                            <li><NavLink to='/dashBoard'>Dashboard</NavLink></li>
                            <li><NavLink to='/logOut'>Logout</NavLink></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;