import logoFooter from '../../../assets/rokto borno.png'

const Footer = () => {
    return (
        <div className="bg-myBgTheme-white dark:bg-myBgTheme-dark shadow-inner">
            <footer className="footer p-10 text-base-content container mx-auto">
                <aside className='text-center w-full flex flex-col items-center md:items-start'>
                    <img className='w-80 mx-auto md:mx-0' src={logoFooter} alt="" />
                </aside>
                <nav className='text-lg font-semibold text-myText-mediumDark dark:text-myText-mediumLight'>
                    <h6 className="text-myBg-dark font-extrabold text-xl uppercase dark:text-myText-highLight dark:border-b-4 dark:border-myBg-dark">Quick Links</h6>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>
                <nav className='text-lg font-semibold text-myText-mediumDark dark:text-myText-mediumLight'>
                    <h6 className="text-myBg-dark font-extrabold text-xl uppercase dark:text-myText-highLight dark:border-b-4 dark:border-myBg-dark">Rokto Borno Services</h6>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav className='text-lg font-semibold text-myText-mediumDark dark:text-myText-mediumLight'>
                    <h6 className="text-myBg-dark font-extrabold text-xl uppercase dark:text-myText-highLight dark:border-b-4 dark:border-myBg-dark">Contract Us</h6>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;