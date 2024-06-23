import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import loadingBloodDrop from '../../assets/Elements/Animation - 1718904614105.gif'


const SearchDonors = () => {
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
    const [userInfo, setUserInfo] = useState([]);
    const [errorText, setErrorText] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = data => {
        if (data.bloodGroup !== 'default' || data.district !== 'default' || data.division !== 'default' || data.upazila !== 'default') {
            axiosPublic.get(`/search?bloodGroup=${data.bloodGroup}&&district=${data.district}&&division=${data.division}&&upazila=${data.upazila}`)
                .then(res => {
                    setUserInfo(res.data);
                    setErrorText('')
                })
                .catch(error => {
                    console.log(error);
                })
        } else {
            setErrorText('Fill up any input field')
        }
    }

    if (loading) {
        return <div className="h-screen flex justify-center items-center"><img src={loadingBloodDrop} alt="" /></div>;
    }

    return (
        <div className="container mx-auto my-9">
            <div className='text-center mb-14 md:mb-28'>
                <h1 className='text-2xl md:text-3xl lg:text-6xl uppercase font-bold text-myBg-dark dark:text-myBgTheme-white border-double border-myBg-dark dark:border-b-8 border-sky-500 inline-block'>Search Donner</h1> <br />
                <h2 className='md:text-xl lg:text-2xl text-myBg-dark mt-2 font-light dark:text-myBgTheme-white dark:bg-myBg-dark inline-block rounded-lg p-2 dark:font-bold dark:uppercase'>
                    Your Journey to Saving Lives Begins Here
                </h2>
            </div>
            <div className="px-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col md:flex-row gap-3 lg:gap-6 items-center w-full'>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-lg text-myBg-dark font-bold dark:text-myBgTheme-white dark:border-b-4 dark:border-myBg-dark">Blood Group*</span>
                            </label>
                            <select
                                {...register('bloodGroup')}
                                className="select select-bordered input-lg capitalize bg-transparent border-2 border-myBg-dark text-myText-highDark font-semibold dark:bg-myText-highDark dark:text-myBgTheme-white"
                                defaultValue={'default'}
                            >
                                <option disabled value="default">Select Blood Group</option>
                                <option value='AA'>A+</option>
                                <option value='A-'>A-</option>
                                <option value='BB'>B+</option>
                                <option value='B-'>B-</option>
                                <option value='ABAB'>AB+</option>
                                <option value='AB-'>AB-</option>
                                <option value='OO'>O+</option>
                                <option value='O-'>O-</option>
                            </select>
                        </div>
                        {/* Division */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-lg text-myBg-dark font-bold dark:text-myBgTheme-white dark:border-b-4 dark:border-myBg-dark">Division*</span>
                            </label>
                            <select
                                {...register('division')}
                                className="select select-bordered input-lg capitalize bg-transparent border-2 border-myBg-dark text-myText-highDark font-semibold dark:bg-myText-highDark dark:text-myBgTheme-white"
                                defaultValue={'default'}
                                onInput={handleDistrict}
                            >
                                <option disabled value="default">Select Division</option>
                                {divisions.map(division =>
                                    <option key={division._id} value={division.name}>{division.name}</option>
                                )}
                            </select>
                            {errors.division && <p className="text-myBg-dark dark:text-myBgTheme-white text-sm mt-2">*{errors.division.message}</p>}
                        </div>
                        {/* District */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-lg text-myBg-dark font-bold dark:text-myBgTheme-white dark:border-b-4 dark:border-myBg-dark">District*</span>
                            </label>
                            <select
                                {...register('district')}
                                className="select select-bordered input-lg capitalize bg-transparent border-2 border-myBg-dark text-myText-highDark font-semibold dark:bg-myText-highDark dark:text-myBgTheme-white"
                                defaultValue={'default'}
                                onInput={handleUpazila}
                            >
                                <option disabled value="default">Select District</option>
                                {districts.map(district =>
                                    <option key={district._id} value={district.name}>{district.name}</option>
                                )}
                            </select>
                            {errors.district && <p className="text-myBg-dark dark:text-myBgTheme-white text-sm mt-2">*{errors.district.message}</p>}
                        </div>
                        {/* Upazila */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-lg text-myBg-dark font-bold dark:text-myBgTheme-white dark:border-b-4 dark:border-myBg-dark">Upazila*</span>
                            </label>
                            <select
                                {...register('upazila')}
                                className="select select-bordered input-lg capitalize bg-transparent border-2 border-myBg-dark text-myText-highDark font-semibold dark:bg-myText-highDark dark:text-myBgTheme-white"
                                defaultValue={'default'}
                            >
                                <option disabled value="default">Select Upazila</option>
                                {upazilas.map(upazila =>
                                    <option key={upazila._id} value={upazila.name}>{upazila.name}</option>
                                )}
                            </select>
                            {errors.upazila && <p className="text-myBg-dark dark:text-myBgTheme-white text-sm mt-2">*{errors.upazila.message}</p>}
                        </div>
                    </div>
                    {/* search */}
                    <div className="form-control mt-6 inline-block">
                        <input className="btn text-base uppercase bg-myBg-dark text-myBgTheme-white font-bold border-4 border-myBg-dark" type="submit" value="Search" />
                    </div>
                </form>
                <p className="text-myBg-dark dark:text-myBgTheme-white text-sm mt-2">{errorText}</p>
            </div>
            <div>
                {
                    userInfo.length !== 0 && <div className="overflow-x-auto my-16">
                        <table className="table w-full text-myText-highDark dark:text-myBgTheme-white text-base">
                            {/* head */}
                            <thead>
                                <tr className="text-myText-highDark text-xl">
                                    <th>#</th>
                                    <th>Avatar</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Blood</th>
                                    <th>District</th>
                                    <th>Upazila</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    userInfo.map((user, idx) =>
                                        <tr key={user._id} className="font-semibold text-lg">
                                            <th>{idx + 1}</th>
                                            <th>
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-20 h-20">
                                                        <img src={user.avatar} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                            </th>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.blood_group}</td>
                                            <td>{user.district}</td>
                                            <td>{user.upazila}</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </div>
    );
};

export default SearchDonors;