import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const CreateDonationReq = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset
    } = useForm({ mode: 'onTouched' });



    const [divisionId, setDivisionIds] = useState("");
    const [districtId, setDistrictId] = useState("");

    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();


    // Location Data Fetch
    const { data: divisions = [] } = useQuery({
        queryKey: ['division'],
        queryFn: async () => {
            const res = await axiosPublic.get('/division')
            return res.data;
        }
    });
    useEffect(() => {
        if (divisionId) {
            axiosPublic.get(`/districts?divisionId=${divisionId}`)
                .then(res => setDistricts(res.data))
                .catch(error => console.error(error));
        }
    }, [divisionId, axiosPublic]);
    useEffect(() => {
        if (districtId) {
            axiosPublic.get(`/districts?districtId=${districtId}`)
                .then(res => setUpazilas(res.data))
                .catch(error => console.error(error));
        }
    }, [districtId, axiosPublic]);

    const handleDistrict = e => {
        const filterDivisionId = divisions.find(division => division.name === e.target.value);
        const divisionId = filterDivisionId.divisionId;
        setDivisionIds(divisionId);
    }
    const handleUpazila = e => {
        const filterDistrictId = districts.find(district => district.name === e.target.value);
        const districtId = filterDistrictId.districtId;
        setDistrictId(districtId);
    }

    const { data: userInfo = [], isLoading, refetch } = useQuery({
        queryKey: ['userInfo', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`)
            return res.data;
        }
    })

    // console.log(userInfo);

    const onSubmit = (data) => {
        console.log(data);
        if (userInfo.status === "active") {
            const reqData = {
                ...data,
                donationStatus: "pending",
                requesterName: userInfo.name,
                requesterEmail: userInfo.email
            }
            console.log(reqData);

            axiosSecure.post(`/donationRequest`, reqData)
                .then(res => {
                    if (res.data.insertedId) {
                        console.log('User Added to the database');
                        reset();
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: `${reqData.recipientName} Request Successfully`,
                            showConfirmButton: false,
                            timer: 2000
                        });
                    }
                })
        } else {
            Swal.fire({
                icon: "error",
                title: "You Are Not Able To Create Request",
                text: "You Are Blocked User!",
            });
        }
    }

    return (
        <div>
            <div className='text-center mb-14 md:mb-28'>
                <h1 className='text-2xl md:text-3xl lg:text-6xl uppercase font-bold text-myBg-dark dark:text-myBgTheme-white border-double border-myBg-dark dark:border-b-8 border-sky-500 inline-block'>Create Donation</h1> <br />
                <p className='md:text-base lg:text-xl text-myText-highDark dark:text-myText-mediumLight'>Your journey to saving lives begins here.</p>
            </div>
            <div className='card shrink-0 shadow-2xl h-full border-x-4 border-myBg-dark mx-auto md:px-12 py-12'>
                <form onSubmit={handleSubmit(onSubmit)} className="card-body grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* requester name */}
                    <div className="form-control flex gap-6 lg:flex-row lg:gap-10">
                        <div>
                            <label className="label">
                                <span className="label-text text-lg text-myBg-dark font-bold dark:text-myBgTheme-white dark:border-b-4 dark:border-myBg-dark capitalize">
                                    Requester Name*
                                </span>
                            </label>
                            <h3
                                className='text-2xl text-myText-highDark font-semibold dark:text-myBgTheme-white capitalize'
                            >{user.displayName}</h3>
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text text-lg text-myBg-dark font-bold dark:text-myBgTheme-white dark:border-b-4 dark:border-myBg-dark capitalize">
                                    Requester Email*
                                </span>
                            </label>
                            <h3
                                className='text-2xl text-myText-highDark font-semibold dark:text-myBgTheme-white capitalize'
                            >{user.email}</h3>
                        </div>
                    </div>
                    {/* Recipient Name */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-lg text-myBg-dark font-bold dark:text-myBgTheme-white dark:border-b-4 dark:border-myBg-dark">Recipient Name*</span>
                        </label>
                        <input
                            {...register('recipientName', { required: true })}
                            type="text"
                            placeholder="Recipient Email"
                            className="input input-lg bg-transparent border-2 border-myBg-dark text-myText-highDark font-semibold dark:text-myBgTheme-white capitalize" />

                        {errors.recipientName && <p className="text-myBg-dark dark:text-myBgTheme-white text-sm mt-2 capitalize">*Email field is required</p>}
                    </div>
                    {/* hospitalName */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-lg text-myBg-dark font-bold dark:text-myBgTheme-white dark:border-b-4 dark:border-myBg-dark capitalize">
                                hospital Name*
                            </span>
                        </label>
                        <input
                            {...register('hospitalName', { required: true })}
                            type="text"
                            placeholder="Hospital Name"
                            className="input input-lg bg-transparent border-2 border-myBg-dark text-myText-highDark font-semibold dark:text-myBgTheme-white capitalize" />

                        {errors.hospitalName && <p className="text-myBg-dark dark:text-myBgTheme-white text-sm mt-2 capitalize">*hospital Name field is required</p>}
                    </div>
                    {/* hospitalName */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-lg text-myBg-dark font-bold dark:text-myBgTheme-white dark:border-b-4 dark:border-myBg-dark capitalize">
                                full Address*
                            </span>
                        </label>
                        <input
                            {...register('fullAddress', { required: true })}
                            type="text"
                            placeholder="Full Address"
                            className="input input-lg bg-transparent border-2 border-myBg-dark text-myText-highDark font-semibold dark:text-myBgTheme-white capitalize" />

                        {errors.fullAddress && <p className="text-myBg-dark dark:text-myBgTheme-white text-sm mt-2 capitalize">*full Address field is required</p>}
                    </div>
                    {/* donationDate */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-lg text-myBg-dark font-bold dark:text-myBgTheme-white dark:border-b-4 dark:border-myBg-dark capitalize">
                                donation Date*
                            </span>
                        </label>
                        <input
                            {...register('donationDate', { required: true })}
                            type="date"
                            placeholder="Donation Date"
                            className="input input-lg bg-myText-mediumLight dark:bg-transparent border-2 border-myBg-dark text-myText-highDark font-semibold dark:text-myBgTheme-white capitalize" />

                        {errors.donationDate && <p className="text-myBg-dark dark:text-myBgTheme-white text-sm mt-2 capitalize">*donation Date field is required</p>}
                    </div>
                    {/* donationTime */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-lg text-myBg-dark font-bold dark:text-myBgTheme-white dark:border-b-4 dark:border-myBg-dark capitalize">
                                donation Time*
                            </span>
                        </label>
                        <input
                            {...register('donationTime', { required: true })}
                            type="time"
                            placeholder="Donation Time"
                            className="input input-lg bg-myText-mediumLight dark:bg-transparent border-2 border-myBg-dark text-myText-highDark font-semibold dark:text-myBgTheme-white capitalize" />

                        {errors.donationTime && <p className="text-myBg-dark dark:text-myBgTheme-white text-sm mt-2 capitalize">*donation Time field is required</p>}
                    </div>
                    {/* requestMessage */}
                    <div className="form-control col-span-1 md:col-span-2">
                        <label className="label">
                            <span className="label-text text-lg text-myBg-dark font-bold dark:text-myBgTheme-white dark:border-b-4 dark:border-myBg-dark capitalize">
                                request Message*
                            </span>
                        </label>
                        <textarea
                            {...register('requestMessage', { required: true })}
                            placeholder="Request Message"
                            className="textarea-lg w-full rounded-lg bg-transparent border-2 border-myBg-dark text-myText-highDark font-semibold dark:text-myBgTheme-white capitalize" />

                        {errors.requestMessage && <p className="text-myBg-dark dark:text-myBgTheme-white text-sm mt-2 capitalize">*request Message field is required</p>}
                    </div>
                    {/* Division */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-lg text-myBg-dark font-bold dark:text-myBgTheme-white dark:border-b-4 dark:border-myBg-dark">Recipient Division*</span>
                        </label>
                        <select
                            {...register('recipientDivision', {
                                validate: value => value !== 'default' || 'Division field is required'
                            })}
                            className="select select-bordered input-lg capitalize bg-transparent border-2 border-myBg-dark text-myText-highDark font-semibold dark:bg-myText-highDark dark:text-myBgTheme-white"
                            defaultValue={'default'}
                            onInput={handleDistrict}
                        >
                            <option disabled value="default">Select Division</option>
                            {divisions.map(division =>
                                <option key={division._id} value={division.name}>{division.name}</option>
                            )}
                        </select>
                        {errors.recipientDivision && <p className="text-myBg-dark dark:text-myBgTheme-white text-sm mt-2">*{errors.recipientDivision.message}</p>}
                    </div>
                    <div className='flex flex-col lg:flex-row gap-6'>
                        {/* District */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-lg text-myBg-dark font-bold dark:text-myBgTheme-white dark:border-b-4 dark:border-myBg-dark">Recipient District*</span>
                            </label>
                            <select
                                {...register('recipientDistrict', {
                                    validate: value => value !== 'default' || 'District field is required'
                                })}
                                className="select select-bordered input-lg capitalize bg-transparent border-2 border-myBg-dark text-myText-highDark font-semibold dark:bg-myText-highDark dark:text-myBgTheme-white"
                                defaultValue={'default'}
                                onInput={handleUpazila}
                            >
                                <option disabled value="default">Select District</option>
                                {districts.map(district =>
                                    <option key={district._id} value={district.name}>{district.name}</option>
                                )}
                            </select>
                            {errors.recipientDistrict && <p className="text-myBg-dark dark:text-myBgTheme-white text-sm mt-2">*{errors.recipientDistrict.message}</p>}
                        </div>
                        {/* Upazila */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-lg text-myBg-dark font-bold dark:text-myBgTheme-white dark:border-b-4 dark:border-myBg-dark">Recipient Upazila*</span>
                            </label>
                            <select
                                {...register('recipientUpazila', {
                                    validate: value => value !== 'default' || 'Upazila field is required'
                                })}
                                className="select select-bordered input-lg capitalize bg-transparent border-2 border-myBg-dark text-myText-highDark font-semibold dark:bg-myText-highDark dark:text-myBgTheme-white"
                                defaultValue={'default'}
                            >
                                <option disabled value="default">Select Upazila</option>
                                {upazilas.map(upazila =>
                                    <option key={upazila._id} value={upazila.name}>{upazila.name}</option>
                                )}
                            </select>
                            {errors.recipientUpazila && <p className="text-myBg-dark dark:text-myBgTheme-white text-sm mt-2">*{errors.recipientUpazila.message}</p>}
                        </div>
                    </div>
                    {/* Submit */}
                    <div className="form-control mt-6 inline-block mx-auto col-span-1 md:col-span-2">
                        <input className="btn text-base uppercase bg-myBg-dark text-myBgTheme-white font-bold border-4 border-myBg-dark" type="submit" value="Create Request" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateDonationReq;