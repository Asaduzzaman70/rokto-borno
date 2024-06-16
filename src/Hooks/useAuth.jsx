import { useContext } from "react";
import { CreateContext } from "../Providers/AuthProvider";

const useAuth = () => {
    const auth = useContext(CreateContext);
    return auth;
};

export default useAuth;