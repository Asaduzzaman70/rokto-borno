import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { FaBook, FaDollarSign, FaRegListAlt, FaShippingFast, FaUsers } from 'react-icons/fa';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AdminHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();


    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    });

    console.log(stats);

    return (
        <div>
            <div className='text-center mb-14'>
                <h1 className='text-2xl md:text-3xl lg:text-4xl uppercase font-bold text-myBg-dark dark:text-myBgTheme-white border-double border-myBg-dark dark:border-b-8 border-sky-500 inline-block'>Welcome To Admin Panel<br /> {user.displayName}</h1> <br />
                <h2 className='md:text-xl lg:text-2xl text-myBg-dark mt-2 font-light dark:text-myBgTheme-white dark:bg-myBg-dark inline-block rounded-lg p-2 dark:font-bold dark:uppercase'>
                    Journey is Saving Lives
                </h2>
            </div>
            <div className="w-full mx-auto space-y-6 my-12 shadow-inner p-8 rounded-lg">

                <div className="border-myBg-dark border-x-8 rounded-xl">
                    <div className="text-4xl border-myBg-dark border-b-4 font-bold mb-6 text-myBg-dark uppercase dark:bg-myBg-dark dark:text-myBgTheme-white p-2">total user</div>
                    <div className='stat text-4xl md:text-7xl lg:text-8xl text-myText-highDark dark:text-myBgTheme-white'>
                        <div className="stat-figure">
                            <FaUsers />
                        </div>
                        <div className="font-bold">{stats.users}</div>
                    </div>
                </div>

                <div className="border-myBg-dark border-x-8 rounded-xl">
                    <div className="text-4xl border-myBg-dark border-b-4 font-bold mb-6 text-myBg-dark uppercase dark:bg-myBg-dark dark:text-myBgTheme-white p-2">total funding</div>
                    <div className='stat text-4xl md:text-7xl lg:text-8xl text-myText-highDark dark:text-myBgTheme-white'>
                        <div className="stat-figure">
                            <FaDollarSign />
                        </div>
                        <div className="font-bold">{stats.revenue}</div>
                    </div>
                </div>

                <div className="border-myBg-dark border-x-8 rounded-xl">
                    <div className="text-4xl border-myBg-dark border-b-4 font-bold mb-6 text-myBg-dark uppercase dark:bg-myBg-dark dark:text-myBgTheme-white p-2">total blood donation request</div>
                    <div className='stat text-4xl md:text-7xl lg:text-8xl text-myText-highDark dark:text-myBgTheme-white'>
                        <div className="stat-figure">
                            <FaRegListAlt />
                        </div>
                        <div className="font-bold">{stats.donation}</div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminHome;