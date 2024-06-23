import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import loadingBloodDrop from '../../assets/Elements/Animation - 1718904614105.gif'


const Blog = () => {
    const axiosPublic = useAxiosPublic();

    const { data: blogDetail = [], isLoading } = useQuery({
        queryKey: ['blogDetail'],
        queryFn: async () => {
            const res = await axiosPublic.get('/blog?status=published');
            return res.data;
        }

    })

    console.log(blogDetail);

    if (isLoading) {
        return <div className="h-screen flex justify-center items-center"><img src={loadingBloodDrop} alt="" /></div>;
    }

    return (
        <div className="container mx-auto my-7">
            <div>
                <div className='text-center mb-14 md:mb-28'>
                    <h1 className='text-2xl md:text-3xl lg:text-6xl uppercase font-bold text-myBg-dark dark:text-myBgTheme-white border-double border-myBg-dark dark:border-b-8 border-sky-500 inline-block'>Blog</h1> <br />
                    <h2 className='md:text-xl lg:text-2xl text-myBg-dark mt-2 font-light dark:text-myBgTheme-white dark:bg-myBg-dark inline-block rounded-lg p-2 dark:font-bold dark:uppercase'>
                        Our Journey to Saving Lives Begins Here
                    </h2>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-3">
                {
                    blogDetail.map(blogInfo =>
                        <div className="card card-compact bg-myBgTheme-white dark:bg-myText-mediumDark shadow-xl p-6">
                            <figure>
                                <div className="w-full h-96">
                                    <div
                                        className="w-full bg-no-repeat bg-cover bg-center h-full"
                                        style={{ backgroundImage: `url(${blogInfo.thumbnail})` }}
                                    ></div>
                                </div>
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title text-2xl text-myBg-dark dark:text-myBgTheme-white border-myBg-dark dark:border-b-8">{blogInfo.blogTitle}</h2>
                                <p className="dark:text-myText-mediumLight text-lg font-semibold">{blogInfo.content.slice(0, 100)} ...</p>
                                <div className="card-actions justify-end">
                                    <Link to={`/viewBlog/${blogInfo._id}`}>
                                        <button className="btn bg-transparent border-none uppercase text-xl text-myBg-dark dark:text-myBgTheme-white">View More</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Blog;