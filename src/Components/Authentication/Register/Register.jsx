import { useState } from 'react';
import img1 from '../../../assets/Elements/Group.png'
import img2 from '../../../assets/Elements/platelet.png'
import { useForm } from "react-hook-form"
import { FaPlus } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [imagePreview, setImagePreview] = useState(null);

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

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <div className="container mx-auto my-32">
            <div className='text-center mb-28'>
                <h1 className='text-2xl md:text-3xl lg:text-6xl uppercase font-bold text-myBg-dark dark:text-myBgTheme-white border-double border-myBg-dark dark:border-b-8 border-sky-500 inline-block'>Join Our Community <br /> of Lifesavers</h1> <br />
                <h2 className='md:text-xl lg:text-2xl text-myBg-dark mt-2 font-light dark:text-myBgTheme-white dark:bg-myBg-dark inline-block rounded-lg p-2 dark:font-bold dark:uppercase'>
                    Your Journey to Saving Lives Begins Here
                </h2>
                <p className='md:text-base lg:text-xl text-myText-highDark dark:text-myText-mediumLight'>Your journey to saving lives begins here. Sign up and make a difference today.</p>
            </div>
            <div className='flex flex-col md:flex-row'>
                <div className="w-1/2 flex justify-center relative">
                    <img src={img1} alt="Group.png" />
                    <img className='absolute w-40 right-32 top-0' src={img2} alt="Group.png" />
                </div>
                <div className="w-1/2">
                    <div className="card shrink-0 shadow-2xl h-full border-2 border-myBg-dark w-3/4 mx-auto">
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
                                            <label htmlFor="fileInput" className="w-64 h-64 flex justify-center items-center rounded-full border-2 border-myBg-dark shadow-2xl">
                                                <FaPlus className='text-6xl text-myBg-dark' />
                                            </label>
                                        </div><br />
                                        <div className='text-center mt-6'>
                                            <span className="label-text text-lg text-myBg-dark font-bold dark:text-myBgTheme-white dark:border-b-4 dark:border-myBg-dark">Choice Photo*</span>
                                            {errors.photo && <p className="text-myBg-dark dark:text-myBgTheme-white text-sm mt-2">*Photo field is required</p>}
                                        </div>
                                    </>
                            }
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            {/* Email */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-lg text-myBg-dark font-bold dark:text-myBgTheme-white dark:border-b-4 dark:border-myBg-dark">Email*</span>
                                </label>
                                <input {...register('email', { required: true })} type="email" placeholder="Email" className="input input-lg bg-transparent border-2 border-myBg-dark text-myText-highDark font-semibold dark:text-myBgTheme-white" />
                                {errors.email && <p className="text-myBg-dark dark:text-myBgTheme-white text-sm mt-2">*Email field is required</p>}
                            </div>
                            {/* Full Name */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-lg text-myBg-dark font-bold dark:text-myBgTheme-white dark:border-b-4 dark:border-myBg-dark">Full Name*</span>
                                </label>
                                <input {...register('name', { required: true })} type="text" placeholder="Full Name" className="input input-lg capitalize bg-transparent border-2 border-myBg-dark text-myText-highDark font-semibold dark:text-myBgTheme-white" />
                                {errors.name && <p className="text-myBg-dark dark:text-myBgTheme-white text-sm mt-2">*Name field is required</p>}
                            </div>
                            {/* Photo Field */}
                            <div className="form-control">
                                <input {...register('photo', { required: true })} onInput={handlePreviewImage} id="fileInput" type="file" placeholder="Photo" className="input input-lg capitalize bg-transparent border-2 border-myBg-dark text-myText-highDark font-semibold dark:text-myBgTheme-white hidden" />
                            </div>
                            {/* Blood Group */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-lg text-myBg-dark font-bold dark:text-myBgTheme-white dark:border-b-4 dark:border-myBg-dark">Blood Group</span>
                                </label>
                                <select
                                    {...register('bloodGroup', {
                                        validate: value => value !== 'default' || 'Blood Group field is required'
                                    })}
                                    className="select select-bordered input-lg capitalize bg-transparent border-2 border-myBg-dark text-myText-highDark font-semibold dark:bg-myText-highDark dark:text-myBgTheme-white"
                                    defaultValue={'default'}
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
                            {/* District */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-lg text-myBg-dark font-bold dark:text-myBgTheme-white dark:border-b-4 dark:border-myBg-dark">Blood Group</span>
                                </label>
                                <select
                                    {...register('district', {
                                        validate: value => value !== 'default' || 'District field is required'
                                    })}
                                    className="select select-bordered input-lg capitalize bg-transparent border-2 border-myBg-dark text-myText-highDark font-semibold dark:bg-myText-highDark dark:text-myBgTheme-white"
                                    defaultValue={'default'}
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
                                {errors.district && <p className="text-myBg-dark dark:text-myBgTheme-white text-sm mt-2">*{errors.district.message}</p>}
                            </div>
                            {/* Submit */}
                            <div className="form-control mt-6">
                                <input className="btn text-base uppercase bg-myBg-dark text-myBgTheme-white font-bold border-4 border-myBg-dark" type="submit" value="Create Account" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;