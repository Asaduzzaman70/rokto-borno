import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import loadingBloodDrop from '../../../assets/Elements/Animation - 1718904614105.gif'
import { useState } from "react";
import UpdateProfile from "./UpdateProfile";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const UserHome = () => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);


    const axiosSecure = useAxiosSecure();
    const { data: userInfo = [], isLoading, refetch } = useQuery({
        queryKey: ['userInfo', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`)
            return res.data;
        }
    })

    console.log(isEditing ? 'Save' : 'Edit', isEditing);

    if (isLoading) {
        return <div className="h-screen flex justify-center items-center"><img src={loadingBloodDrop} alt="" /></div>;
    }

    const { avatar, name, blood_group, district, division, email, upazila } = userInfo;

    return (
        <div className="w-full md:max-w-7xl rounded overflow-hidden shadow-lg mx-auto min-h-screen p-6">
            {
                !isEditing ?
                    <>
                        <div tabIndex={0} className="avatar flex justify-center">
                            <div className="w-64 h-64 rounded-full border-8 border-myBg-dark shadow-2xl">
                                <img alt="Tailwind CSS Navbar component" src={avatar} />
                            </div>
                        </div>
                        <div className="text-center mt-4">
                            <h2 className="text-4xl text-center bg-transparent font-extrabold text-myBg-dark dark:text-myBgTheme-white inline-block p-3 rounded-xl dark:bg-myBg-dark uppercase">{name}</h2>
                            <p className="text-myText-highDark dark:text-myText-highLight text-2xl">{email}</p>
                            <div className="mt-4 text-left text-3xl">
                                <p className="text-myBgTheme-white font-bold bg-myBg-dark p-3 rounded-xl"><strong>Blood Group: </strong>{blood_group}</p>
                            </div>
                            <div className="flex flex-col text-left md:text-center md:flex-row text-2xl md:justify-between my-12 text-myText-highDark dark:text-myBgTheme-white font-bold">
                                <p className=""><strong>Division : </strong>{division} </p>
                                <p className=""><strong>District : </strong>{district} </p>
                                <p className=""><strong>Upazila : </strong>{upazila} </p>
                            </div>
                        </div>
                    </>
                    : <><UpdateProfile setIsEditing={setIsEditing} isEditing={isEditing} userInfo={userInfo} refetch={refetch}/></>
            }
            <div className="text-center mt-24 mb-6 relative">
                <div  
                    type="button"
                    onClick={() => setIsEditing(!isEditing)}
                >
                    {
                        isEditing ? 
                        <div className="w-full h-full text-5xl text-right absolute bottom-[1500px] text-myBg-dark"><FaAngleLeft/></div> 
                        : <button className="btn text-base uppercase bg-myBg-dark text-myBgTheme-white font-bold border-4 border-myBg-dark">Edit</button>
                    }
                </div>
            </div>
        </div>
    );
};

export default UserHome;