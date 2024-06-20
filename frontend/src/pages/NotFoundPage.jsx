import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from "react-router-dom";
import Footer from '../components/Footer';

const NotFoundPage = ({ title }) => {
    const navigate = useNavigate();
    return (
        <div className='flex flex-col min-h-screen'>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content="Oops! The page you are looking for could not be found. It might have been removed or does not exist." />
            </Helmet>
            <div className="flex-grow flex items-center justify-center bg-gray-900 text-white" style={{ height: 'calc(100vh - 4rem)' }}>
                <div className="text-center">
                    <h1 className="text-6xl font-bold mb-4">404</h1>
                    <p className="text-xl">Oops! Page not found.</p>
                    <p className="text-lg mt-2">The page you are looking for might have been removed or doesn't exist.</p>
                    <button className="mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => navigate("/")}>
                        Go Back
                    </button>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    );
};

export default NotFoundPage;
