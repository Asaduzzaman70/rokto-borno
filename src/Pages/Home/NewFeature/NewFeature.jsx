import img from '../../../assets/Elements/OIP.jpg'

const NewFeature = () => {
    return (
        <div className="hero" style={{ backgroundImage: `url(${img})` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content my-14 text-myBgTheme-white">
                <div className="max-w-3xl">
                    <h1 className="mb-5 text-5xl font-bold text-myBgTheme-white">Connecting Blood Donors with Recipients</h1>
                    <p className="mb-5 text-myBgTheme-white">VitalLink is a user-friendly application designed to streamline and enhance blood donation efforts. By seamlessly connecting donors with individuals in urgent need of blood, VitalLink facilitates a swift and efficient donation process. This platform aims to bridge the gap between donors and recipients, ensuring timely access to life-saving blood donations with ease.</p>
                </div>
            </div>
        </div>
    );
};

export default NewFeature;