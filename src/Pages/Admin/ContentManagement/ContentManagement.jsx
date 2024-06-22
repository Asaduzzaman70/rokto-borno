import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import loadingBloodDrop from '../../../assets/Elements/Animation - 1718904614105.gif'
import BlogItem from "../../../Components/DashboardComponents/BlogItem/BlogItem";


const ContentManagement = () => {
    const axiosSecure = useAxiosSecure();

    const { data: blogInfo = [], isLoading, refetch } = useQuery({
        queryKey: ['blogInfo'],
        queryFn: async () => {
            const res = await axiosSecure.get('/blog');
            return res.data;
        }
    })

    if (isLoading) {
        return <div className="h-screen flex justify-center items-center"><img src={loadingBloodDrop} alt="" /></div>;
    }

    console.log(blogInfo);

    return (
        <div>
            <div className="text-right">
                <Link to={'/dashboard/addBlog'}>
                    <button className="btn text-base uppercase bg-myBg-dark text-myBgTheme-white font-bold border-4 border-myBg-dark">Add Blog</button>
                </Link>
            </div>
            <div className="space-y-4 mt-6">
                {
                    blogInfo.map(blog => <BlogItem key={blog._id} blog={blog} refetch={refetch}/>)
                }
            </div>
        </div>
    );
};

export default ContentManagement;