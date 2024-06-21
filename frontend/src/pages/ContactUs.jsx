import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from '../components/Footer';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../components/Loader/Loader';

const ContactUsPage = ({ title }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/queries`, { name, email, query });
            console.log('Form submitted:', response.data);
            toast.success('Query sent successfully!');
            // Clear the form fields
            setName('');
            setEmail('');
            setQuery('');
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Failed to send query. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Helmet>
                <title>{title}</title>
                <meta name="description" content="Get in touch with us by filling out the form below." />
            </Helmet>
            <div className="flex-grow flex items-center justify-center bg-gray-100 py-12">
                <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-6 text-center">Contact Us</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input 
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Your name"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input 
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Your email"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="query">
                                Query
                            </label>
                            <textarea 
                                id="query"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Your query"
                                rows="4"
                                required
                                style={{ width: '100%', height: '150px', resize: "none" }}
                            ></textarea>
                        </div>
                        <div className="flex items-center justify-between">
                            <button 
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                disabled={loading}
                            >
                                Submit
                            </button>
                        </div>
                        {loading && (
                            <div className="flex justify-center mt-4">
                                 <Loader/>
                            </div>
                        )}
                    </form>
                </div>
            </div>
            {/* <Footer /> */}
            <ToastContainer />
        </div>
    );
};

export default ContactUsPage;
