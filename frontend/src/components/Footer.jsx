import React, { useContext } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn ,FaPinterest } from 'react-icons/fa';
import { navbarContext } from '../context/NavbarContext';
import { Link } from 'react-router-dom';

function Footer() {
    const { setselectedSidebar } = useContext(navbarContext)

    return (
        <footer className="bg-neutral-900 text-white">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="md:col-span-2">
                        <h2 className="text-2xl font-display font-bold mb-4 text-white">Rupay Savvy</h2>
                        <p className="text-neutral-300 mb-6 max-w-md">
                            Your trusted source for the best deals, honest product reviews, and smart shopping decisions.
                            Save money while discovering amazing products.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href={import.meta.env.VITE_FB_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-neutral-800 hover:bg-primary-500 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110"
                                aria-label="Follow us on Facebook"
                            >
                                <FaFacebookF size="18" />
                            </a>
                            <a
                                href={import.meta.env.VITE_INSTAGRAM_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-neutral-800 hover:bg-primary-500 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110"
                                aria-label="Follow us on Instagram"
                            >
                                <FaInstagram size="18" />
                            </a>
                            <a
                                href={import.meta.env.VITE_LINKEDIN_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-neutral-800 hover:bg-primary-500 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110"
                                aria-label="Follow us on LinkedIn"
                            >
                                <FaLinkedinIn size="18" />
                            </a>
                            <a
                                href={import.meta.env.VITE_PINTEREST_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-neutral-800 hover:bg-primary-500 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110"
                                aria-label="Follow us on Pinterest"
                            >
                                <FaPinterest size="18" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/"
                                    className="text-neutral-300 hover:text-primary-400 transition-colors duration-200"
                                    onClick={() => setselectedSidebar("home")}
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contact-us"
                                    className="text-neutral-300 hover:text-primary-400 transition-colors duration-200"
                                    onClick={() => setselectedSidebar("contact-us")}
                                >
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/affiliate-disclosure"
                                    className="text-neutral-300 hover:text-primary-400 transition-colors duration-200"
                                    onClick={() => setselectedSidebar("affiliate-disclosure")}
                                >
                                    Affiliate Disclosure
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Legal</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/privacy-policy"
                                    className="text-neutral-300 hover:text-primary-400 transition-colors duration-200"
                                    onClick={() => setselectedSidebar("privacy-policy")}
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/terms-and-conditions"
                                    className="text-neutral-300 hover:text-primary-400 transition-colors duration-200"
                                    onClick={() => setselectedSidebar("terms-and-conditions")}
                                >
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/disclaimer"
                                    className="text-neutral-300 hover:text-primary-400 transition-colors duration-200"
                                    onClick={() => setselectedSidebar("disclaimer")}
                                >
                                    Disclaimer
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-neutral-800 mt-8 pt-8 text-center">
                    <p className="text-neutral-400">
                        &copy; {new Date().getFullYear()} Rupay Savvy. All rights reserved. Made with ❤️ for smart shoppers.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
