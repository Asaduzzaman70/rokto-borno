import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import loadingBloodDrop from '../../assets/Elements/Animation - 1718904614105.gif'


const BloodDonationRequest = () => {
    const axiosPublic = useAxiosPublic();

    const { data: donationReqDatas = [], isLoading, refetch } = useQuery({
        queryKey: ['allDonationReqData'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/donationRequest/pending`);
            return res.data;
        }
    })

    if (isLoading) {
        return <div className="h-screen flex justify-center items-center"><img src={loadingBloodDrop} alt="" /></div>;
    }

    return (
        <div className="mb-28">
            <div className='text-center mb-14 md:mb-28'>
                <h1 className='text-2xl md:text-3xl lg:text-6xl uppercase font-bold text-myBg-dark dark:text-myBgTheme-white border-double border-myBg-dark dark:border-b-8 border-sky-500 inline-block'>Blood Donation Request</h1> <br />
                <h2 className='md:text-xl lg:text-2xl text-myBg-dark mt-2 font-light dark:text-myBgTheme-white dark:bg-myBg-dark inline-block rounded-lg p-2 dark:font-bold dark:uppercase'>
                    Your Journey to Saving Lives Begins Here
                </h2>
            </div>
            <div className="px-6">
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
                                <th>view</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                donationReqDatas.map((donationReqData, idx) =>
                                    <tr key={donationReqData._id} className="text-myText-highDark dark:text-myBgTheme-white font-bold">
                                        <th>{idx + 1}</th>
                                        <td>{donationReqData.recipientName}</td>
                                        <td>{donationReqData.recipientDistrict}, {donationReqData.recipientUpazila}</td>
                                        <td>{donationReqData.donationDate}</td>
                                        <td>{donationReqData.donationTime}</td>
                                        <td className="uppercase">
                                            <span className="text-myBtnColor-yellow">
                                                {donationReqData.donationStatus}
                                            </span>
                                        </td>

                                        <td>
                                            <Link to={`/dashboard/userHome/viewDetails/${donationReqData._id}`}>
                                                <button className="btn bg-myText-mediumDark text-myBgTheme-white font-bold border-none">
                                                    <FaEye />
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BloodDonationRequest;