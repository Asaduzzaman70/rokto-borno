import React from 'react';

const Contract = () => {
    return (
        <div className="bg-gray-100 py-12">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="px-6 py-8 md:flex md:items-center">
                        <div className="text-center md:text-left md:flex-1">
                            <h2 className="text-xl font-bold text-gray-800 mb-2">Contact Us</h2>
                            <p className="text-gray-600">Have questions or want to donate blood? Contact us using the form below or call us directly.</p>
                        </div>
                    </div>
                    <div className="px-6 py-8">
                        <form>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-800 font-bold mb-1">Name</label>
                                <input type="text" id="name" name="name" className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-800 font-bold mb-1">Email Address</label>
                                <input type="email" id="email" name="email" className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="message" className="block text-gray-800 font-bold mb-1">Message</label>
                                <textarea id="message" name="message" rows="4" className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"></textarea>
                            </div>
                            <div className="mb-6">
                                <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">Send Message</button>
                            </div>
                        </form>
                        <div className="text-center text-gray-600">
                            <p>Or call us at <span className="font-bold">1-800-555-1234</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contract;