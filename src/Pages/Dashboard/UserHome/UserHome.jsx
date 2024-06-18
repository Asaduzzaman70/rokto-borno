import useAuth from "../../../Hooks/useAuth";

const UserHome = () => {
    const {user} = useAuth();

    

    return (
        <div>
            <h1>This Is user home</h1>
        </div>
    );
};

export default UserHome;