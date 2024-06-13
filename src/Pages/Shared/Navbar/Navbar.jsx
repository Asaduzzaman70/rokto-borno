import { Link, NavLink } from "react-router-dom";
import logo from '../../../assets/Rokto borno logo.png'

const Navbar = () => {
    const listItem = <>
    <li><NavLink to='/a'>donation requests</NavLink></li>
    <li><NavLink to='/b'>blog</NavLink></li>
    <li><NavLink to='/c'>funding</NavLink></li>
    </>

    return (
        <div className="shadow-2xl bg-fixed">
            <div className="navbar container mx-auto py-3 justify-between">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="lg:hidden btn btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-lg dropdown-content mt-7 z-[1] p-2 bg-base-100 w-64 uppercase rounded-b-lg border-b-2 border-x-2">
                            {listItem}
                        </ul>
                    </div>
                    <Link to='/' className="h-full">
                        <img className="h-20" src={logo} alt="" />
                    </Link>
                </div>
                <div className="navbar-end hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-lg uppercase">
                        {listItem}
                    </ul>
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>
                    <ul tabIndex={0} className="menu menu-lg dropdown-content mt-7 z-[1] p-2 shadow bg-base-100 w-64 uppercase rounded-b-lg border-b-2 border-x-2">
                        <li><NavLink to='/dashBoard'>Dashboard</NavLink></li>
                        <li><NavLink to='/logOut'>Logout</NavLink></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;