import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import loadingBloodDrop from '../../../assets/Elements/Animation - 1718904614105.gif'
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const DashboardHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: donationReqDatas = [], isLoading, refetch } = useQuery({
        queryKey: ['donationReqData', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/donationRequest?email=${user?.email}`);
            return res.data;
        }
    })

    if (isLoading) {
        return <div className="h-screen flex justify-center items-center"><img src={loadingBloodDrop} alt="" /></div>;
    }
    // console.log(donationReqDatas);

    const handleDelete = donationReqData => {
        console.log(donationReqData);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to delete this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/donationRequest?id=${donationReqData._id}`)
                    .then(res => {
                        console.log(res.data.deletedCount);
                        if (res.data.deletedCount > 0) {
                            console.log('User Added to the database');
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: `${donationReqData.name} Is Deleted`,
                                icon: "success"
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        });

    }

    return (
        <div>
            <div className='text-center mb-14 md:mb-28'>
                <h1 className='text-2xl md:text-3xl lg:text-6xl uppercase font-bold text-myBg-dark dark:text-myBgTheme-white border-double border-myBg-dark dark:border-b-8 border-sky-500 inline-block'>Welcome! <br />{user?.displayName}</h1> <br />
                <h2 className='md:text-xl lg:text-2xl text-myBg-dark mt-2 font-light dark:text-myBgTheme-white dark:bg-myBg-dark inline-block rounded-lg p-2 dark:font-bold dark:uppercase'>
                    Your Journey to Saving Lives Begins Here
                </h2>
                <p className='md:text-base lg:text-xl text-myText-highDark dark:text-myText-mediumLight'>Your journey to saving lives begins here.</p>
            </div>
            <div>
                <div className="overflow-x-auto rounded-t-2xl">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr className="uppercase text-base bg-myBg-dark text-myBgTheme-white">
                                <th></th>
                                <th>recipient name</th>
                                <th>recipient location</th>
                                <th>donation date</th>
                                <th>donation time</th>
                                <th>status</th>
                                <th>donor information</th>
                                <th>edit</th>
                                <th>delete</th>
                                <th>view</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                donationReqDatas.slice(donationReqDatas.length - 3, donationReqDatas.length).map((donationReqData, idx) =>
                                    <tr key={donationReqData._id} className="text-myText-highDark dark:text-myBgTheme-white font-bold">
                                        <th>{idx + 1}</th>
                                        <td>{donationReqData.recipientName}</td>
                                        <td>{donationReqData.recipientDistrict}, {donationReqData.recipientUpazila}</td>
                                        <td>{donationReqData.donationDate}</td>
                                        <td>{donationReqData.donationTime}</td>
                                        <td className="uppercase">
                                            <span className="text-myBtnColor-yellow">
                                                {donationReqData.donationStatus === 'pending' && donationReqData.donationStatus}
                                            </span>
                                            <span className="text-myBtnColor-blue">
                                                {donationReqData.donationStatus === 'inprogress' && donationReqData.donationStatus}
                                            </span>
                                            <span className="text-myBtnColor-green">
                                                {donationReqData.donationStatus === 'done' && donationReqData.donationStatus}
                                            </span>
                                            <span className="text-myBg-dark">
                                                {donationReqData.donationStatus === 'canceled' && donationReqData.donationStatus}
                                            </span>
                                        </td>
                                        <td>{donationReqData.donationStatus === 'inprogress' && donationReqData.recipientEmail || donationReqData.donationStatus === 'done' && donationReqData.recipientEmail || donationReqData.donationStatus === 'canceled' && donationReqData.recipientEmail}</td>
                                        <td>
                                            <Link to={`editDonation/${donationReqData._id}`}>
                                                <button className="btn bg-myBtnColor-green text-myBgTheme-white font-bold border-none">
                                                    <FaEdit />
                                                </button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button onClick={() => handleDelete(donationReqData)} className="btn bg-myBg-dark text-myBgTheme-white font-bold border-none">
                                                <FaTrash />
                                            </button>
                                        </td>
                                        <td>
                                            <Link to={`viewDetails/${donationReqData._id}`}>
                                                <button className="btn bg-myText-mediumDark text-myBgTheme-white font-bold border-none">
                                                    <FaEye />
                                                </button>
                                            </Link>
                                        </td>
                                        <td>
                                            {donationReqData.donationStatus === 'inprogress' && (
                                                <div className="flex gap-2">
                                                    <button
                                                        className="btn bg-myBtnColor-green text-myBgTheme-white font-bold border-none uppercase"
                                                        onClick={() => handleStatusChange(donationReqData._id, 'done')}
                                                    >
                                                        done
                                                    </button>
                                                    <button
                                                        className="btn bg-myBg-dark text-myBgTheme-white font-bold border-none uppercase"
                                                        onClick={() => handleStatusChange(donationReqData._id, 'canceled')}
                                                    >
                                                        canceled
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="text-center mt-12">
                <Link to={'/dashboard/myDonationRequests'}>
                    <button className="btn text-base uppercase bg-myBg-dark text-myBgTheme-white font-bold border-4 border-myBg-dark">
                        view my all request
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default DashboardHome;