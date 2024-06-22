import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaRegTrashAlt, FaUsers } from "react-icons/fa";

const SingleUser = ({ user, idx, refetch }) => {
    const axiosSecure = useAxiosSecure();

    // staus
    const handleStatus = (status) => {
        console.log(user.email);
        if (status === 'active') {
            Swal.fire({
                title: "Are you sure?",
                text: "You Active This Account!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes!"
            }).then((result) => {
                if (result.isConfirmed) {
                    axiosSecure.patch(`/users?status=active&&email=${user.email}`)
                        .then(res => {
                            if (res.data.modifiedCount > 0) {
                                refetch();
                                Swal.fire({
                                    title: "Account Is Active!",
                                    text: "This Account Is Active Now.",
                                    icon: "success"
                                });
                            }
                            console.log(res.data);
                        })
                }
            });
        }
        if (status === 'blocked') {
            Swal.fire({
                title: "Are you sure?",
                text: "You Blocked This Account!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes!"
            }).then((result) => {
                if (result.isConfirmed) {
                    axiosSecure.patch(`/users?status=blocked&&email=${user.email}`)
                        .then(res => {
                            if (res.data.modifiedCount > 0) {
                                refetch();
                                Swal.fire({
                                    title: "Account Is Blocked!",
                                    text: "This Account Is Blocked Now.",
                                    icon: "success"
                                });
                            }
                            console.log(res.data);
                        })
                }
            });
        }
    }

    // role Change
    const handleChangeRole = (role) => {
        console.log(role, user.email);
        if (role === 'admin') {
            Swal.fire({
                title: "Are you sure?",
                text: "To Make This Account As a Admin!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes!"
            }).then((result) => {
                if (result.isConfirmed) {
                    axiosSecure.patch(`/users?role=admin&&email=${user.email}`)
                        .then(res => {
                            if (res.data.modifiedCount > 0) {
                                refetch();
                                Swal.fire({
                                    title: "This Account Is Admin Account!",
                                    text: "This Account Is Admin Now.",
                                    icon: "success"
                                });
                            }
                            // console.log(res.data);
                        })
                }
            });
        }
        if (role === 'volunteer') {
            Swal.fire({
                title: "Are you sure?",
                text: "To Make This Account As a Volunteer!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes!"
            }).then((result) => {
                if (result.isConfirmed) {
                    axiosSecure.patch(`/users?role=volunteer&&email=${user.email}`)
                        .then(res => {
                            if (res.data.modifiedCount > 0) {
                                refetch();
                                Swal.fire({
                                    title: "This Account Is Volunteer Account!",
                                    text: "This Account Is Volunteer Now.",
                                    icon: "success"
                                });
                            }
                            // console.log(res.data);
                        })
                }
            });
        }
        if (role === 'donner') {
            Swal.fire({
                title: "Are you sure?",
                text: "To Make This Account As a Donner!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes!"
            }).then((result) => {
                if (result.isConfirmed) {
                    axiosSecure.patch(`/users?role=donner&&email=${user.email}`)
                        .then(res => {
                            if (res.data.modifiedCount > 0) {
                                refetch();
                                Swal.fire({
                                    title: "This Account Is Donner Account!",
                                    text: "This Account Is Donner Now.",
                                    icon: "success"
                                });
                            }
                            // console.log(res.data);
                        })
                }
            });
        }
    }

    return (
        <tr key={user._id} className="font-semibold text-lg">
            <th>{idx + 1}</th>
            <th>
                <div className="avatar">
                    <div className="mask mask-squircle w-20 h-20">
                        <img src={user.avatar} alt="Avatar Tailwind CSS Component" />
                    </div>
                </div>
            </th>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td className="uppercase">
                <span className="text-myBtnColor-green font-extrabold">{user.role === 'admin' && user.role}</span>
                <span className="text-myBtnColor-green">{user.role === 'volunteer' && user.role}</span>
                <span>{user.role === 'donner' && user.role}</span>
            </td>
            <td>
                {
                    user.status === 'active' ?
                        <button className="btn m-1 text-base uppercase bg-myBtnColor-green text-myBgTheme-white font-bold border-4 border-myBtnColor-green" onClick={() => handleStatus('blocked')}>{user.status}</button>
                        : <button className="btn m-1 text-base uppercase bg-myBg-dark text-myBgTheme-white font-bold border-4 border-myBg-dark" onClick={() => handleStatus('active')}>{user.status}</button>
                }
            </td>
            <td>
                <div className="dropdown dropdown-left dropdown-end">
                    <div tabIndex={0} role="button" className="btn m-1 text-base uppercase bg-myBg-dark text-myBgTheme-white font-bold border-4 border-myBg-dark">{user.role}</div>
                    <ul tabIndex={0} className="menu-md dropdown-content z-[1] p-2 shadow dark:bg-myBgTheme-dark bg-myBgTheme-white uppercase rounded-lg font-myFont font-bold text-base text-myText-highDark dark:text-myText-highLight border-4 border-myBg-dark flex">
                        {
                            user.role === 'admin' && <>
                                <li>
                                    <button
                                        onClick={() => handleChangeRole('volunteer')}
                                        className="btn m-1 text-base uppercase bg-myBg-dark text-myBgTheme-white font-bold border-4 border-myBg-dark">Volunteer</button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => handleChangeRole('donner')}
                                        className="btn m-1 text-base uppercase bg-myBg-dark text-myBgTheme-white font-bold border-4 border-myBg-dark">Donner</button>
                                </li>
                            </>
                        }
                        {
                            user.role === 'donner' && <>
                                <li>
                                    <button
                                        onClick={() => handleChangeRole('volunteer')}
                                        className="btn m-1 text-base uppercase bg-myBg-dark text-myBgTheme-white font-bold border-4 border-myBg-dark">Volunteer</button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => handleChangeRole('admin')}
                                        className="btn m-1 text-base uppercase bg-myBg-dark text-myBgTheme-white font-bold border-4 border-myBg-dark">Admin</button>
                                </li>
                            </>
                        }
                        {
                            user.role === 'volunteer' && <>
                                <li>
                                    <button
                                        onClick={() => handleChangeRole('donner')}
                                        className="btn m-1 text-base uppercase bg-myBg-dark text-myBgTheme-white font-bold border-4 border-myBg-dark">Donner</button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => handleChangeRole('admin')}
                                        className="btn m-1 text-base uppercase bg-myBg-dark text-myBgTheme-white font-bold border-4 border-myBg-dark">Admin</button>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </td>
        </tr>
    );
};

export default SingleUser;