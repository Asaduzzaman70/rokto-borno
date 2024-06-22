import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import loadingBloodDrop from '../../../assets/Elements/Animation - 1718904614105.gif'
import Swal from "sweetalert2";
import { useState } from "react";


const EditDonation = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({ mode: 'onTouched' });
    const { id } = useParams();
    const navigate = useNavigate();

    const { user } = useAuth();

    const axiosSecure = useAxiosSecure();

    const [donationEdit, setDonationEdit] = useState([])

    const { isPending } = useQuery({
        queryKey: ['donationEdit', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`donationRequest?id=${id}`);
            setDonationEdit(res.data);
        }
    })

    console.log(donationEdit);
    if (isPending) {
        return <div className="h-screen flex justify-center items-center"><img src={loadingBloodDrop} alt="" /></div>;
    }

    const onSubmit = (data) => {
        console.log(data);
        axiosSecure.patch(`/donationRequest/${id}`, data)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    console.log('User Added to the database');
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Update Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "No Changes",
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                // console.log(res.data);
                // navigate('/dashboard/userHome/')
            })
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-lg text-myBg-dark font-bold dark:text-myBgTheme-white dark:border-b-4 dark:border-myBg-dark">Recipient Name*</span>
                    </label>
                    <input
                        {...register('recipientName', { required: true })}
                        type="text"
                        placeholder="Recipient Name"
                        defaultValue={donationEdit.recipientName}
                        className="input input-lg bg-transparent border-2 border-myBg-dark text-myText-highDark font-semibold dark:text-myBgTheme-white"
                    />
                    {errors.recipientName && <p className="text-myBg-dark dark:text-myBgTheme-white text-sm mt-2">*Name field is required</p>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-lg text-myBg-dark font-bold dark:text-myBgTheme-white dark:border-b-4 dark:border-myBg-dark">Recipient Email*</span>
                    </label>
                    <input
                        {...register('recipientEmail', { required: true })}
                        type="email"
                        placeholder="Recipient Email"
                        defaultValue={donationEdit.recipientEmail}
                        className="input input-lg bg-transparent border-2 border-myBg-dark text-myText-highDark font-semibold dark:text-myBgTheme-white"
                    />
                    {errors.recipientEmail && <p className="text-myBg-dark dark:text-myBgTheme-white text-sm mt-2">*Email field is required</p>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-lg text-myBg-dark font-bold dark:text-myBgTheme-white dark:border-b-4 dark:border-myBg-dark">Full Address*</span>
                    </label>
                    <input
                        {...register('fullAddress', { required: true })}
                        type="text"
                        placeholder="Full Address"
                        defaultValue={donationEdit.fullAddress}
                        className="input input-lg bg-transparent border-2 border-myBg-dark text-myText-highDark font-semibold dark:text-myBgTheme-white"
                    />
                    {errors.fullAddress && <p className="text-myBg-dark dark:text-myBgTheme-white text-sm mt-2">*Full Address field is required</p>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-lg text-myBg-dark font-bold dark:text-myBgTheme-white dark:border-b-4 dark:border-myBg-dark">Hospital Name*</span>
                    </label>
                    <input
                        {...register('hospitalName', { required: true })}
                        type="text"
                        placeholder="Hospital Name"
                        defaultValue={donationEdit.hospitalName}
                        className="input input-lg bg-transparent border-2 border-myBg-dark text-myText-highDark font-semibold dark:text-myBgTheme-white"
                    />
                    {errors.hospitalName && <p className="text-myBg-dark dark:text-myBgTheme-white text-sm mt-2">*Hospital Name field is required</p>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-lg text-myBg-dark font-bold dark:text-myBgTheme-white dark:border-b-4 dark:border-myBg-dark">Donation Date*</span>
                    </label>
                    <input
                        {...register('donationDate', { required: true })}
                        type="date"
                        placeholder="Hospital Name"
                        defaultValue={donationEdit.donationDate}
                        className="input input-lg bg-transparent border-2 border-myBg-dark text-myText-highDark font-semibold dark:text-myBgTheme-white"
                    />
                    {errors.donationDate && <p className="text-myBg-dark dark:text-myBgTheme-white text-sm mt-2">*Donation Date field is required</p>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-lg text-myBg-dark font-bold dark:text-myBgTheme-white dark:border-b-4 dark:border-myBg-dark">Donation Time*</span>
                    </label>
                    <input
                        {...register('donationTime', { required: true })}
                        type="text"
                        placeholder="Donation Time"
                        defaultValue={donationEdit.donationTime}
                        className="input input-lg bg-transparent border-2 border-myBg-dark text-myText-highDark font-semibold dark:text-myBgTheme-white"
                    />
                    {errors.donationTime && <p className="text-myBg-dark dark:text-myBgTheme-white text-sm mt-2">*Donation Time field is required</p>}
                </div>
                <div className="form-control md:col-span-2 lg:col-span-3">
                    <label className="label">
                        <span className="label-text text-lg text-myBg-dark font-bold dark:text-myBgTheme-white dark:border-b-4 dark:border-myBg-dark">Request Message*</span>
                    </label>
                    <textarea
                        {...register('requestMessage', { required: true })}
                        type="text"
                        placeholder="Request Message"
                        defaultValue={donationEdit.requestMessage}
                        className="input input-lg bg-transparent border-2 border-myBg-dark text-myText-highDark font-semibold dark:text-myBgTheme-white"
                    />
                    {errors.requestMessage && <p className="text-myBg-dark dark:text-myBgTheme-white text-sm mt-2">*Request Message field is required</p>}
                </div>
                {/* Submit */}
                <div className="form-control mt-6">
                    <input className="btn text-base uppercase bg-myBg-dark text-myBgTheme-white font-bold border-4 border-myBg-dark" type="submit" value="Edit Donation Request" />
                </div>
            </form>
        </div>
    );
};

export default EditDonation;