import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import loadingBloodDrop from '../../../assets/Elements/Animation - 1718904614105.gif'
import useAuth from '../../../Hooks/useAuth';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const UpdateProfile = ({ isEditing, userInfo, refetch }) => {
    console.log('isEditing', isEditing);
    const { avatar, name, blood_group, district, division, email, upazila } = userInfo;

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({ mode: 'onTouched' });

    const [imagePreview, setImagePreview] = useState(null);

    const [divisionId, setDivisionIds] = useState("");
    const [districtId, setDistrictId] = useState("");

    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const { register: createUser, namePhotoUrl, user, setLoading } = useAuth();

    const navigate = useNavigate();

    const password = watch('password');



    const handlePreviewImage = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']; // Add more types if needed

            if (allowedTypes.includes(file.type)) {
                setImagePreview(URL.createObjectURL(file));
            } else {
                // Handle non-image file types (e.g., show an error message)
                console.log('Only Image');
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Only Image File You Can Uploaded!",
                });
            }
        }
    };
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
    // console.log('This is value of upazilas:- ', upazilas);

    const onSubmit = async (data) => {

        const { bloodGroup, district, division, name, upazila, photo } = data;

        const userInfo = {
            name,
            avatar: photo,
            blood_group: bloodGroup,
            division,
            district,
            upazila,
        };

        if (photo.length > 0) {
            const imageFile = { image: data.photo[0] }
            const resImgBb = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });
            console.log(resImgBb.data.data.display_url);
            if (resImgBb.data.success) {
                namePhotoUrl(data.name, resImgBb.data.data.display_url)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            avatar: resImgBb.data.data.display_url,
                            blood_group: data.bloodGroup,
                            division: data.division,
                            district: data.district,
                            upazila: data.upazila,
                        }
                        axiosSecure.patch(`/users/${user?.email}`, userInfo)
                            .then(res => {
                                if (res.data.modifiedCount > 0) {
                                    console.log('User Added to the database');
                                    // reset();
                                    // setImagePreview(null);
                                    refetch();
                                    Swal.fire({
                                        position: "center",
                                        icon: "success",
                                        title: "User Created Successfully",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    // navigate('/')
                                    setLoading(false)
                                }
                                console.log(res.data);
                            })

                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        } else {
            console.log(avatar);
            namePhotoUrl(data.name, avatar)
                .then(() => {
                    const userInfo = {
                        name: data.name,
                        email: data.email,
                        avatar: avatar,
                        blood_group: data.bloodGroup,
                        division: data.division,
                        district: data.district,
                        upazila: data.upazila,
                    }
                    axiosSecure.patch(`/users/${user?.email}`, userInfo)
                        .then(res => {
                            if (res.data.modifiedCount > 0) {
                                console.log('User Added to the database');
                                // reset();
                                // setImagePreview(null);
                                refetch();
                                Swal.fire({
                                    position: "center",
                                    icon: "success",
                                    title: "User Created Successfully",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                // navigate('/')
                                setLoading(false)
                            }
                            console.log(res.data);
                        })

                })
                .catch(error => {
                    console.log(error);
                })
        }
    }

    return (
        <div className="container mx-auto my-32 px-4">
            <div className='text-center mb-14 md:mb-28'>
                <h1 className='text-2xl md:text-3xl lg:text-6xl uppercase font-bold text-myBg-dark dark:text-myBgTheme-white border-double border-myBg-dark dark:border-b-8 border-sky-500 inline-block'>Update your profile</h1>
            </div>
            {/* Section 2 */}
            <div className="card shrink-0 shadow-2xl h-full border-2 border-myBg-dark md:w-3/4 mx-auto md:px-12 py-12">
                {/* Image Preview */}
                <div className='inline-block mx-auto'>
                    {
                        imagePreview ? <div tabIndex={0} role="button" className="avatar">
                            <div className="w-64 h-64 rounded-full border-8 border-myBg-dark shadow-2xl">
                                <img alt="Tailwind CSS Navbar component" src={imagePreview} />
                            </div>
                        </div>
                            :
                            <>
                                <div tabIndex={0} role="button" className="avatar">
                                    <label htmlFor="fileInput" className="w-64 h-64 rounded-full border-8 border-myBg-dark shadow-2xl">
                                        <img className='rounded-full' alt="Tailwind CSS Navbar component" src={avatar} />
                                    </label>
                                </div><br />
                                <div className='text-center mt-6'>
                                    <span className="label-text text-lg text-myBg-dark font-bold dark:text-myBgTheme-white dark:border-b-4 dark:border-myBg-dark">Choice Photo*</span>
                                    {errors.photo && <p className="text-myBg-dark dark:text-myBgTheme-white text-sm mt-2">*Photo field is required</p>}
                                </div>
                            </>
                    }
                </div>
                {/* Form Field */}
                <form onSubmit={handleSubmit(onSubmit)} className="card-body space-y-6">
                    {/* Full Name */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-lg text-myBg-dark font-bold dark:text-myBgTheme-white dark:border-b-4 dark:border-myBg-dark">Full Name*</span>
                        </label>
                        <input
                            {...register('name', { required: true })}
                            type="text"
                            placeholder="Full Name"
                            className="input input-lg capitalize bg-transparent border-2 border-myBg-dark text-myText-highDark font-semibold dark:text-myBgTheme-white"
                            defaultValue={name}
                        />
                        {errors.name && <p className="text-myBg-dark dark:text-myBgTheme-white text-sm mt-2">*Name field is required</p>}
                    </div>
                    {/* Blood Group */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-lg text-myBg-dark font-bold dark:text-myBgTheme-white dark:border-b-4 dark:border-myBg-dark">Blood Group*</span>
                        </label>
                        <select
                            {...register('bloodGroup', {
                                validate: value => value !== 'default' || 'Blood Group field is required'
                            })}
                            className="select select-bordered input-lg capitalize bg-transparent border-2 border-myBg-dark text-myText-highDark font-semibold dark:bg-myText-highDark dark:text-myBgTheme-white"
                            defaultValue={blood_group}
                        >
                            <option disabled value="default">Select Blood Group</option>
                            <option value='A+'>A+</option>
                            <option value='A-'>A-</option>
                            <option value='B+'>B+</option>
                            <option value='B-'>B-</option>
                            <option value='AB+'>AB+</option>
                            <option value='AB-'>AB-</option>
                            <option value='O+'>O+</option>
                            <option value='O-'>O-</option>
                        </select>
                        {errors.bloodGroup && <p className="text-myBg-dark dark:text-myBgTheme-white text-sm mt-2">*{errors.bloodGroup.message}</p>}
                    </div>
                    {/* Division */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-lg text-myBg-dark font-bold dark:text-myBgTheme-white dark:border-b-4 dark:border-myBg-dark">Division*</span>
                        </label>
                        <select
                            {...register('division', {
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
                        {errors.division && <p className="text-myBg-dark dark:text-myBgTheme-white text-sm mt-2">*{errors.division.message}</p>}
                    </div>
                    <div className='flex flex-col md:flex-row gap-6'>
                        {/* District */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-lg text-myBg-dark font-bold dark:text-myBgTheme-white dark:border-b-4 dark:border-myBg-dark">District*</span>
                            </label>
                            <select
                                {...register('district', {
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
                            {errors.district && <p className="text-myBg-dark dark:text-myBgTheme-white text-sm mt-2">*{errors.district.message}</p>}
                        </div>
                        {/* Upazila */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-lg text-myBg-dark font-bold dark:text-myBgTheme-white dark:border-b-4 dark:border-myBg-dark">Upazila*</span>
                            </label>
                            <select
                                {...register('upazila', {
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
                            {errors.upazila && <p className="text-myBg-dark dark:text-myBgTheme-white text-sm mt-2">*{errors.upazila.message}</p>}
                        </div>
                    </div>
                    {/* Photo Field */}
                    <div className="form-control">
                        <input
                            {...register('photo')}
                            onInput={handlePreviewImage} id="fileInput"
                            type="file"
                            placeholder="Photo"
                            className="input input-lg capitalize bg-transparent border-2 border-myBg-dark text-myText-highDark font-semibold dark:text-myBgTheme-white hidden"
                        />
                    </div>
                    {/* Submit */}
                    <div className="form-control mt-6">
                        <input className="btn text-base uppercase bg-myBg-dark text-myBgTheme-white font-bold border-4 border-myBg-dark" type="submit" value="Update Profile" />
                    </div>
                </form>
            </div >
        </div >
    );
};

export default UpdateProfile;