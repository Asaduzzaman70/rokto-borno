import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import loadingBloodDrop from '../../assets/Elements/Animation - 1718904614105.gif'
import DonateModal from "../DonateModal/DonateModal";
import useAuth from "../../Hooks/useAuth";


const RequestDetails = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const { id } = useParams();
    // console.log(id);

    const { data: requestInfo = [], isLoading } = useQuery({
        queryKey: ['donationReqInf'],
        queryFn: async () => {
            const res = await axiosSecure.get(`donationRequest?id=${id}`)
            return res.data;
        }
    })

    // console.log(requestInfo);
    const { donationDate, donationStatus, donationTime, requesterName, requesterEmail, fullAddress, hospitalName, recipientDistrict, recipientName, recipientUpazila, requestMessage, _id } = requestInfo;

    if (isLoading) {
        return <div className="h-screen flex justify-center items-center"><img src={loadingBloodDrop} alt="" /></div>;
    }


    return (
        <div className="container mx-auto p-5 my-10">
            <div className='text-center'>
                <h1 className='text-2xl md:text-3xl lg:text-6xl uppercase font-bold text-myBg-dark dark:text-myBgTheme-white border-double border-myBg-dark dark:border-b-8 border-sky-500 inline-block'>View Details</h1> <br />
                <h2 className='md:text-xl lg:text-2xl text-myBg-dark mt-2 font-light dark:text-myBgTheme-white dark:bg-myBg-dark inline-block rounded-lg p-2 dark:font-bold dark:uppercase'>
                    Your Journey to Saving Lives Begins Here
                </h2>
            </div>
            <div className="flex justify-center items-center bg-gray-100">
                <div className="bg-white shadow-md rounded-lg p-8 max-w-5xl w-full">
                    <h1 className="text-4xl font-bold mb-4 text-center text-myText-highDark uppercase dark:text-myBgTheme-white">Donation Details</h1>
                    <div className="space-y-4">
                        <div className="space-y-3">
                            <h2 className="text-2xl font-bold text-myBg-dark border-b-4 dark:text-myBgTheme-white dark:bg-myBg-dark dark:p-2">Recipient Information</h2>
                            <p className="dark:text-myBgTheme-white text-xl text-myText-highDark my-1 "><span className="font-bold">Name:</span> {recipientName}</p>
                            <p className="dark:text-myBgTheme-white text-xl text-myText-highDark my-1 "><span className="font-bold">District:</span> {recipientDistrict}</p>
                            <p className="dark:text-myBgTheme-white text-xl text-myText-highDark my-1 "><span className="font-bold">Upazila:</span> {recipientUpazila}</p>
                        </div>
                        <div className="space-y-3">
                            <h2 className="text-2xl font-bold text-myBg-dark border-b-4 dark:text-myBgTheme-white dark:bg-myBg-dark dark:p-2">Hospital Information</h2>
                            <p className="dark:text-myBgTheme-white text-xl text-myText-highDark my-1 "><span className="font-bold">Name:</span> {hospitalName}</p>
                            <p className="dark:text-myBgTheme-white text-xl text-myText-highDark my-1 "><span className="font-bold">Address:</span> {fullAddress}</p>
                        </div>
                        <div className="space-y-3">
                            <h2 className="text-2xl font-bold text-myBg-dark border-b-4 dark:text-myBgTheme-white dark:bg-myBg-dark dark:p-2">Donation Information</h2>
                            <p className="dark:text-myBgTheme-white text-xl text-myText-highDark my-1 "><span className="font-bold">Date:</span> {donationDate}</p>
                            <p className="dark:text-myBgTheme-white text-xl text-myText-highDark my-1 "><span className="font-bold">Time:</span> {donationTime}</p>
                            <p className="dark:text-myBgTheme-white text-xl text-myText-highDark my-1 "><span className="font-bold">Request Message:</span> {requestMessage}</p>
                            <p className="dark:text-myBgTheme-white text-xl text-myText-highDark my-1 "><span className="font-bold">Status:</span> {donationStatus}</p>
                        </div>
                        <div className="space-y-3">
                            <h2 className="text-2xl font-bold text-myBg-dark border-b-4 dark:text-myBgTheme-white dark:bg-myBg-dark dark:p-2">Requester Information</h2>
                            <p className="dark:text-myBgTheme-white text-xl text-myText-highDark my-1 "><span className="font-bold">Email:</span> {requesterEmail}</p>
                            <p className="dark:text-myBgTheme-white text-xl text-myText-highDark my-1 "><span className="font-bold">Email:</span> {requesterName}</p>
                        </div>
                    </div>
                    <div className="text-center mt-24">
                        <DonateModal user={user} axiosSecure={axiosSecure} _id={_id}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RequestDetails;