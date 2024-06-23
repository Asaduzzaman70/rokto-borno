import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import loadingBloodDrop from '../../assets/Elements/Animation - 1718904614105.gif'


const ViewBlog = () => {
    const { _id } = useParams();
    console.log(_id);
    const axiosPublic = useAxiosPublic();

    const { data: blogView = [], isLoading } = useQuery({
        queryKey: ['blogView'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/blog?_id=${_id}`);
            return res.data;
        }

    })
    console.log(blogView);

    if (isLoading) {
        return <div className="h-screen flex justify-center items-center"><img src={loadingBloodDrop} alt="" /></div>;
    }

    return (
        <div className="container mx-auto space-y-12 my-28 p-6">
            <div tabIndex={0} role="button">
                <div className="w-96 h-96 border-4 border-myBg-dark shadow-2xl rounded-md">
                    <div
                        className="w-full bg-no-repeat bg-cover bg-center h-full"
                        style={{ backgroundImage: `url(${blogView.thumbnail})` }}
                    ></div>
                </div>
            </div>
            <div>
                <h1 className="uppercase text-myBg-dark font-bold dark:text-myBgTheme-white text-3xl lg:text-6xl border-myBg-dark dark:pb-4 dark:border-b-8">{blogView.blogTitle}</h1>
                <p className="text-2xl text-justify my-12 dark:text-myText-highLight">
                    {blogView.content}
                </p>
            </div>
        </div>
    );
};

export default ViewBlog;