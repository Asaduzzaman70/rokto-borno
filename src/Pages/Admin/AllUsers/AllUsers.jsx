import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaArrowDown, FaRegTrashAlt, FaUsers } from "react-icons/fa";
import SingleUser from "./SingleUser";
import loadingBloodDrop from '../../../assets/Elements/Animation - 1718904614105.gif'


const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data;
        }
    })

    if (isLoading) {
        return <div className="h-screen flex justify-center items-center"><img src={loadingBloodDrop} alt="" /></div>;
    }

    return (
        <div className="mb-20">
            <div className="flex justify-evenly my-4">
                <h2 className="text-2xl md:text-3xl lg:text-6xl uppercase font-bold text-myBg-dark dark:text-myBgTheme-white border-double border-myBg-dark dark:border-b-8 border-sky-500 inline-block">All Users</h2>
                <h2 className="text-2xl md:text-3xl lg:text-6xl uppercase font-bold text-myBg-dark dark:text-myBgTheme-white border-double border-myBg-dark dark:border-b-8 border-sky-500 inline-block">Total Users: {users.length}</h2>
            </div>
            <div className="overflow-x-auto mt-16">
                <table className="table w-full text-myText-highDark dark:text-myBgTheme-white text-base">
                    {/* head */}
                    <thead>
                        <tr className="text-myText-highDark text-xl">
                            <th>#</th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Change Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, idx) =>
                                <SingleUser key={user._id} user={user} idx={idx} refetch={refetch} />
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;