import { FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const BlogItem = ({ blog, refetch }) => {
    const axiosSecure = useAxiosSecure();

    const handleDelete = () => {
        console.log(blog._id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/blog?id=${blog._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                        console.log(res.data);
                    })
            }
        });
    }

    const handleChangeRole = status => {
        console.log(status);
        if (status === 'draft') {
            axiosSecure.patch(`/blog?status=draft&&id=${blog._id}`)
                .then(res => {
                    console.log(res.data);
                    if (res.data.matchedCount > 0) {
                        refetch();
                    }
                })
        }
        if (status === 'published') {
            axiosSecure.patch(`/blog?status=published&&id=${blog._id}`)
                .then(res => {
                    console.log(res.data);
                    if (res.data.matchedCount > 0) {
                        refetch();
                    }
                })
        }
        if (status === 'unpublish') {
            axiosSecure.patch(`/blog?status=unpublish&&id=${blog._id}`)
                .then(res => {
                    console.log(res.data);
                    if (res.data.matchedCount > 0) {
                        refetch();
                    }
                })
        }
    }

    return (
        <div className="shadow-inner border-2 border-myBg-dark rounded-md p-6">
            <div tabIndex={0} role="button">
                <div className="w-96 h-96 border-4 border-myBg-dark shadow-2xl rounded-md">
                    <div
                        className="w-full bg-no-repeat bg-cover bg-center h-full"
                        style={{ backgroundImage: `url(${blog.thumbnail})` }}
                    ></div>
                </div>
            </div>
            <div>
                <h1 className="mt-5 text-3xl text-myBg-dark font-bold uppercase dark:text-myBgTheme-white dark:bg-myBg-dark dark:p-3 rounded-md">{blog.blogTitle}</h1>
                <h1 className="text-xl my-6 text-myText-highDark dark:text-myBgTheme-white">{blog.content}</h1>
            </div>
            <div className="flex items-center">
                <div className="dropdown dropdown-right dropdown-end">
                    <div tabIndex={0} role="button" className="btn m-1 text-base uppercase bg-myBg-dark text-myBgTheme-white font-bold border-4 border-myBg-dark">{blog.blogStatus}</div>
                    <ul tabIndex={0} className="menu menu-lg dropdown-content z-[1] p-2 shadow dark:bg-myBgTheme-dark bg-myBgTheme-white w-64 uppercase rounded-lg font-myFont font-bold text-base text-myText-highDark dark:text-myText-highLight border-4 border-myBg-dark space-y-3">
                        {
                            blog.blogStatus === 'draft' && <>
                                <li>
                                    <button
                                        onClick={() => handleChangeRole('published')}
                                        className="btn m-1 text-base uppercase bg-myBg-dark text-myBgTheme-white font-bold border-4 border-myBg-dark">Published</button>
                                </li>
                            </>
                        }
                        {
                            blog.blogStatus === 'published' && <>
                                <li>
                                    <button
                                        onClick={() => handleChangeRole('unpublish')}
                                        className="btn m-1 text-base uppercase bg-myBg-dark text-myBgTheme-white font-bold border-4 border-myBg-dark">UnPublish</button>
                                </li>
                            </>
                        }
                        {
                            blog.blogStatus === 'unpublish' && <>
                                <li>
                                    <button
                                        onClick={() => handleChangeRole('draft')}
                                        className="btn m-1 text-base uppercase bg-myBg-dark text-myBgTheme-white font-bold border-4 border-myBg-dark">Draft</button>
                                </li>
                            </>
                        }
                    </ul>
                </div>
                <button onClick={handleDelete} className="btn text-base uppercase bg-myBg-dark text-myBgTheme-white font-bold border-4 border-myBg-dark">
                    <FaTrash />
                </button>
            </div>
        </div>
    );
};

export default BlogItem;