import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../components/Loader/Loader';

const ContactUsPage = () => {
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
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
            <Helmet>
                <title>Contact Us - Rupay Savvy</title>
                <meta name="description" content="Get in touch with Rupay Savvy for any queries, feedback, or support. We're here to help you with your shopping decisions and product recommendations." />
                <meta property="og:title" content="Contact Us - Rupay Savvy" />
                <meta property="og:description" content="Get in touch with Rupay Savvy for queries, feedback, or support." />
                <link rel="canonical" href="https://rupaysavvy.in/contact-us" />
            </Helmet>

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                        Get in Touch
                    </h1>
                    <p className="text-xl text-primary-100 max-w-2xl mx-auto">
                        Have questions about deals, products, or need support? We&apos;re here to help you make smart shopping decisions.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-large p-8">
                            <h2 className="text-2xl font-display font-bold text-neutral-800 mb-6">Send us a Message</h2>
                            <p className="text-neutral-600 mb-8">We&apos;d love to hear from you! Send us a message and we&apos;ll respond as soon as possible.</p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-neutral-700 font-semibold mb-2" htmlFor="name">
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Your full name"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-neutral-700 font-semibold mb-2" htmlFor="email">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                                        placeholder="your.email@example.com"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-neutral-700 font-semibold mb-2" htmlFor="query">
                                        Message *
                                    </label>
                                    <textarea
                                        id="query"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 h-32 resize-none"
                                        placeholder="Tell us about your query, feedback, or how we can help you..."
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-neutral-400 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Sending...' : 'Send Message'}
                                </button>

                                {loading && (
                                    <div className="flex justify-center">
                                        <Loader/>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>

                    {/* Contact Info Sidebar */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-2xl shadow-large p-6">
                            <h3 className="text-xl font-display font-bold text-neutral-800 mb-4">Contact Information</h3>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-semibold text-neutral-700 mb-1">Email</h4>
                                    <p className="text-neutral-600">rupaysavvy@gmail.com</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-neutral-700 mb-1">Response Time</h4>
                                    <p className="text-neutral-600">We typically respond within 24 hours</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6">
                            <h3 className="text-xl font-display font-bold text-primary-800 mb-4">Quick Help</h3>
                            <div className="space-y-3">
                                <p className="text-primary-700 text-sm">
                                    Looking for product recommendations? Include details about your budget and preferences.
                                </p>
                                <p className="text-primary-700 text-sm">
                                    Found a broken link or deal? Let us know the product name and we&apos;ll fix it quickly.
                                </p>
                                <p className="text-primary-700 text-sm">
                                    Want to suggest a product review? We love hearing about products you&apos;d like us to cover.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};

export default ContactUsPage;
