import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const DonateModal = ({ user, axiosSecure, _id }) => {
    const navigate = useNavigate();
    const handleDonate = (e) => {
        e.preventDefault();
        const donarInfo = {
            donarName: user.displayName,
            donarEmail: user.email,
            donationStatus: 'inprogress'
        }

        axiosSecure.patch(`/confirmDonation/${_id}`, donarInfo)
            .then(res => {
                console.log(res.data.matchedCount);
                if (res.data.matchedCount > 0) {
                    Swal.fire({
                        title: "Be Prepared",
                        text: `Thank You!`,
                        icon: "success"
                    });
                    navigate('/allRequest')
                }
            })
            .catch(error => {
                console.log(error);
            })
        console.log(donarInfo)
    }


    return (
        <div>
            <button className="btn text-base uppercase bg-myBg-dark text-myBgTheme-white font-bold border-4 border-myBg-dark" onClick={() => document.getElementById('my_modal_5').showModal()}>Donate</button>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-myBg-dark p-10">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-myText-mediumLight">✕</button>
                    </form>
                    <div>
                        <div className='text-left'>
                            <h1 className='text-lg text-myText-mediumLight uppercase'>Donor Name (YOU)</h1>
                            <h3 className="text-2xl text-myBgTheme-white">{user.displayName}</h3>
                        </div>
                        <div className='text-left border-t-8 border-myBgTheme-white mt-10 pt-10 mb-16'>
                            <h1 className='text-lg text-myText-mediumLight uppercase'>Donor Email (YOUR Email)</h1>
                            <h3 className="text-2xl text-myBgTheme-white">{user.email}</h3>
                        </div>
                        <div>
                            <form onSubmit={handleDonate}>
                                {/* if there is a button in form, it will close the modal */}
                                <input type='submit' value='confirming donation' className="btn text-base uppercase bg-myBg-dark text-myBgTheme-white font-bold border-4 border-myBg-dark shadow-xl" />
                            </form>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default DonateModal;