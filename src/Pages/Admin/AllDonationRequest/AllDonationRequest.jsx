import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowDown, FaEdit, FaEye, FaTrash } from "react-icons/fa";
import loadingBloodDrop from '../../../assets/Elements/Animation - 1718904614105.gif'
import Swal from "sweetalert2";
import { useEffect, useState } from "react";


const AllDonationRequest = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [filterText, setFilterText] = useState('filtering');

    const { data: reqData = [], isLoading, refetch } = useQuery({
        queryKey: ['allDonationReqData'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/donationRequestAdmin/admin`);
            return res.data;
        }
    })

    const [donationReq, setDonationReq] = useState(reqData);
    useEffect(() => {
        setDonationReq(reqData)
    }, [reqData])


    const [donationReqDatas, setDonationReqDatas] = useState(donationReq);
    useEffect(() => {
        setDonationReqDatas(donationReq)
    }, [donationReq])
    // console.log(donationReqDatas);

    if (isLoading) {
        return <div className="h-screen flex justify-center items-center"><img src={loadingBloodDrop} alt="" /></div>;
    }


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

    const handleFilter = arg => {
        if (arg === 'pending') {
            setFilterText('pending');
            const filter = donationReq.filter(dataReq => dataReq.donationStatus === 'pending');
            setDonationReqDatas(filter)
        }
        if (arg === 'inprogress') {
            setFilterText('inprogress');
            const filter = donationReq.filter(dataReq => dataReq.donationStatus === 'inprogress');
            setDonationReqDatas(filter)
        }
        if (arg === 'done') {
            setFilterText('done');
            const filter = donationReq.filter(dataReq => dataReq.donationStatus === 'done');
            setDonationReqDatas(filter)
        }
        if (arg === 'canceled') {
            setFilterText('canceled')
            const filter = donationReq.filter(dataReq => dataReq.donationStatus === 'canceled');
            setDonationReqDatas(filter)
        }
    }

    console.log(donationReqDatas);

    return (
        <div>
            <div>
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn m-1 text-base uppercase bg-myBg-dark text-myBgTheme-white font-bold border-4 border-myBg-dark">{filterText} <FaArrowDown /></div>
                    <ul tabIndex={0} className="menu menu-lg dropdown-content z-[1] p-2 shadow dark:bg-myBgTheme-dark bg-myBgTheme-white w-64 uppercase rounded-b-lg font-myFont font-bold text-base text-myText-highDark dark:text-myText-highLight border-b-4 border-x-4 border-myBg-dark space-y-3">
                        <li>
                            <button onClick={() => handleFilter('pending')}>Pending</button>
                        </li>
                        <li>
                            <button onClick={() => handleFilter('inprogress')}>Inprogress</button>
                        </li>
                        <li>
                            <button onClick={() => handleFilter('done')}>Done</button>
                        </li>
                        <li>
                            <button onClick={() => handleFilter('canceled')}>Canceled</button>
                        </li>
                    </ul>
                </div>
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
                                donationReqDatas.map((donationReqData, idx) =>
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
                                        <td>{donationReqData.donationStatus === 'inprogress' && donationReqData.donarEmail || donationReqData.donationStatus === 'done' && donationReqData.donarEmail || donationReqData.donationStatus === 'canceled' && donationReqData.donarEmail}</td>
                                        <td>
                                            <Link to={`/dashboard/userHome/editDonation/${donationReqData._id}`}>
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
                                            <Link to={`/dashboard/userHome/viewDetails/${donationReqData._id}`}>
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
        </div>
    );
};

export default AllDonationRequest;