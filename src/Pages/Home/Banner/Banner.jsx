import { Link } from 'react-router-dom';
import bannerSvg from '../../../assets/blood-drop-svgrepo-com.svg'

const Banner = () => {
    return (
        <div className="my-16 md:my-32 px-6">
            <div className="container mx-auto flex flex-col-reverse md:flex-row items-center h-full gap-16 md:gap-6">
                <div className='md:w-3/5'>
                    <h1 className='text-2xl md:text-3xl lg:text-7xl uppercase font-bold text-myText-highDark dark:text-myBgTheme-white dark:leading-tight'><span className='text-myBg-dark font-extrabold text-3xl md:text-4xl lg:text-8xl
                    dark:text-myBgTheme-white dark:bg-myBg-dark dark:px-4 dark:rounded-2xl
                    '>Welcome</span> <br />to the Blood <br />Donation <span className='text-myBg-dark dark:text-myBgTheme-white dark:bg-myBg-dark dark:px-4 dark:rounded-2xl'>Application</span></h1>
                    <h2 className='md:text-xl lg:text-2xl text-myBg-dark mt-2 font-light inline-block dark:border-b-4 dark:text-myBgTheme-white dark:border-myBg-dark'>Connecting Lives, One Donation at a Time</h2>
                    <p className='md:text-base lg:text-xl text-myText-highDark dark:text-myText-mediumLight'>Join us in saving lives. Your blood can make a difference.</p>
                    <div className='space-x-4 mt-7'>
                        <Link to='/login'>
                            <button className='btn bg-transparent text-base uppercase text-myBg-dark font-bold border-4 border-myBg-dark
                            dark:text-myBgTheme-white
                            '>Join as a donor</button>
                        </Link>
                        <Link>
                            <button className='btn text-base uppercase bg-myBg-dark text-myBgTheme-white font-bold border-4 border-myBg-dark'>Search Donors</button>
                        </Link>
                    </div>
                </div>
                <div className='w-64 md:w-2/5'>
                    <img src={bannerSvg} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Banner;