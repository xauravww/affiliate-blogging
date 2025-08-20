import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from "react-router-dom";
import Footer from '../components/Footer';

const NotFoundPage = ({ title }) => {
    const navigate = useNavigate();
    return (
        <div className='flex flex-col min-h-screen'>
            <Helmet>
                <title>404 - Page Not Found | Rupay Savvy</title>
                <meta name="description" content="Oops! The page you are looking for could not be found. It might have been removed or does not exist. Return to Rupay Savvy homepage for the best deals." />
                <meta name="robots" content="noindex, nofollow" />
                <meta property="og:title" content="404 - Page Not Found | Rupay Savvy" />
                <meta property="og:description" content="The page you're looking for doesn't exist. Discover amazing deals on Rupay Savvy homepage." />
            </Helmet>
            <div className="flex-grow flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 px-6">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-large p-8 text-center">
                    <div className="text-6xl mb-6">🔍</div>
                    <h1 className="text-4xl font-display font-bold text-neutral-800 mb-4">404</h1>
                    <h2 className="text-xl font-semibold text-neutral-700 mb-4">Page Not Found</h2>
                    <p className="text-neutral-600 mb-6">
                        The page you're looking for might have been moved, deleted, or doesn't exist.
                        Don't worry, let's get you back to finding great deals!
                    </p>
                    <div className="space-y-3">
                        <button
                            onClick={() => navigate("/")}
                            className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105"
                        >
                            Back to Homepage
                        </button>
                        <button
                            onClick={() => window.history.back()}
                            className="w-full bg-neutral-200 hover:bg-neutral-300 text-neutral-700 font-semibold py-3 px-6 rounded-xl transition-all duration-200"
                        >
                            Go Back
                        </button>
                    </div>

                    <div className="mt-6 pt-6 border-t border-neutral-200">
                        <p className="text-sm text-neutral-500 mb-3">Popular pages:</p>
                        <div className="flex flex-wrap gap-2 justify-center">
                            <button
                                onClick={() => navigate("/contact-us")}
                                className="text-xs bg-neutral-100 hover:bg-neutral-200 text-neutral-600 px-3 py-1 rounded-full transition-colors duration-200"
                            >
                                Contact Us
                            </button>
                            <button
                                onClick={() => navigate("/affiliate-disclosure")}
                                className="text-xs bg-neutral-100 hover:bg-neutral-200 text-neutral-600 px-3 py-1 rounded-full transition-colors duration-200"
                            >
                                Affiliate Disclosure
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    );
};

export default NotFoundPage;
