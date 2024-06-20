import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const UserHome = () => {
    const { user } = useAuth();

    const axiosSecure = useAxiosSecure();
    const { data: userInfo = [] } = useQuery({
        queryKey: ['userInfo', user.email],
        queryFn: async () =>{
            const res = axiosSecure.get(`/users/${user.email}`)
        }
    })



    return (
        <div>
            <h1>This Is user home</h1>
        </div>
    );
};

export default UserHome;