import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddBlog = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset
    } = useForm({ mode: 'onTouched' });
    const [imagePreview, setImagePreview] = useState(null);
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();



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

    const onSubmit = async (data) => {
        console.log(data);
        const imageFile = { image: data.thumbnail[0] }
        const resImgBb = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (resImgBb.data.success) {
            // resImgBb.data.data.display_url
            console.log(resImgBb.data.success, resImgBb.data.data.display_url);
            const blogInfo = {
                blogTitle: data.blogTitle,
                content: data.content,
                thumbnail: resImgBb.data.data.display_url,
                blogStatus: 'draft'
            }
            axiosSecure.post(`/blog`, blogInfo)
                .then(res => {
                    if (res.data.insertedId) {
                        console.log('Blog Added to the database');
                        reset();
                        setImagePreview(null);
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Blog Created Successfully",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
                .catch(error =>{
                    console.log(error);
                })
        }
    }

    return (
        <div className="mb-14 mt-8">
            {/* Image Preview */}
            <div className='w-full'>
                {
                    imagePreview ? <div tabIndex={0} role="button">
                        <div className="w-96 h-96 border-4 border-myBg-dark shadow-2xl rounded-md">
                            <div
                                className="w-full bg-no-repeat bg-cover bg-center h-full"
                                style={{ backgroundImage: `url(${imagePreview})` }}
                            ></div>
                        </div>
                    </div>
                        :
                        <>
                            <div tabIndex={0} role="button">
                                <label htmlFor="fileInput" className="w-96 h-96 flex justify-center items-center rounded-md border-2 border-myBg-dark shadow-2xl">
                                    <FaPlus className='text-6xl text-myBg-dark' />
                                </label>
                            </div><br />
                            <div className='text-center mt-6'>
                                <span className="label-text text-lg text-myBg-dark font-bold dark:text-myBgTheme-white dark:border-b-4 dark:border-myBg-dark">Choice Thumbnail*</span>
                                {errors.photo && <p className="text-myBg-dark dark:text-myBgTheme-white text-sm mt-2">*Thumbnail field is required</p>}
                            </div>
                        </>
                }
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Photo Field */}
                <div className="form-control">
                    <input {...register('thumbnail', { required: true })} onInput={handlePreviewImage} id="fileInput" type="file" placeholder="Thumbnail" className="input input-lg capitalize bg-transparent border-2 border-myBg-dark text-myText-highDark font-semibold dark:text-myBgTheme-white hidden" />
                </div>
                {/* Blog Title */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-lg text-myBg-dark font-bold dark:text-myBgTheme-white dark:border-b-4 dark:border-myBg-dark">Blog Title*</span>
                    </label>
                    <input {...register('blogTitle', { required: true })} type="text" placeholder="Blog Title" className="input input-lg capitalize bg-transparent border-2 border-myBg-dark text-myText-highDark font-semibold dark:text-myBgTheme-white" />
                    {errors.blogTitle && <p className="text-myBg-dark dark:text-myBgTheme-white text-sm mt-2">*Name field is required</p>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-lg text-myBg-dark font-bold dark:text-myBgTheme-white dark:border-b-4 dark:border-myBg-dark">Blog Content*</span>
                    </label>
                    <textarea
                        {...register('content', { required: true })}
                        placeholder="Blog Content"
                        className="capitalize bg-transparent border-2 border-myBg-dark text-myText-highDark font-semibold dark:text-myBgTheme-white rounded-md h-96 p-5 text-xl" />
                    {errors.content && <p className="text-myBg-dark dark:text-myBgTheme-white text-sm mt-2">*Content field is required</p>}
                </div>
                {/* Submit */}
                <div className="form-control mt-6 inline-block">
                    <input className="btn text-base uppercase bg-myBg-dark text-myBgTheme-white font-bold border-4 border-myBg-dark" type="submit" value="Add Blog" />
                </div>
            </form>
        </div>
    );
};

export default AddBlog;