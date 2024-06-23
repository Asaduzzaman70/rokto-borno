import axios from "axios";

const axiosPublic = axios.create({
    // baseURL: 'https://b9a12-server-side-asaduzzaman70.vercel.app'
    baseURL: 'http://localhost:5000'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;