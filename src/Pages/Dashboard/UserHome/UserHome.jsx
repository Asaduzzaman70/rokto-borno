import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const UserHome = () => {
    const { user } = useAuth();

    const axiosSecure = useAxiosSecure();
    const { data: userInfo = [] } = useQuery({
        queryKey: ['userInfo', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`)
            return res.data;
        }
    })

    console.log(userInfo);

    const { avatar, name, blood_group, district, division, email, upazila } = userInfo;

    return (
        <div className="max-w-7xl rounded overflow-hidden shadow-lg p-6 mx-auto">
            <div tabIndex={0} role="button" className="avatar flex justify-center">
                <div className="w-64 h-64 rounded-full border-8 border-myBg-dark shadow-2xl">
                    <img alt="Tailwind CSS Navbar component" src={avatar} />
                </div>
            </div>
            <div className="text-center mt-4">
                <h2 className="text-4xl font-extrabold text-myBg-dark dark:text-myBgTheme-white inline-block p-3 rounded-xl dark:bg-myBg-dark uppercase">{name}</h2>
                <p className="text-myText-highDark dark:text-myText-highLight text-2xl">{email}</p>
                <div className="mt-4 text-left text-3xl">
                    <p className="text-myBgTheme-white font-bold bg-myBg-dark p-3 rounded-xl"><strong>Blood Group: </strong>{blood_group} </p>
                </div>
                <div className="flex text-2xl justify-between my-12 text-myText-highDark dark:text-myBgTheme-white font-bold">
                    <p className=""><strong>Division : </strong>{division} </p>
                    <p className=""><strong>District : </strong>{district} </p>
                    <p className=""><strong>Upazila : </strong>{upazila} </p>
                </div>
            </div>
            <div className="text-center mt-24 mb-6">
                <Link to={'/editProfile'}>
                    <button className="btn text-base uppercase bg-myBg-dark text-myBgTheme-white font-bold border-4 border-myBg-dark">Edit</button>
                </Link>
            </div>
        </div>
    );
};

export default UserHome;