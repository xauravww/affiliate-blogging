import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                <div className="text-center md:text-left">
                    <h2 className="text-2xl font-bold mb-4">Rupya Savvy</h2>
                    <p className="text-gray-400">&copy; 2024 Rupya Savvy. All rights reserved.</p>
                </div>
                <div className="flex justify-center md:justify-end mt-4 md:mt-0">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white mx-2">
                        <FaFacebookF size="20" />
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white mx-2">
                        <FaTwitter size="20" />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white mx-2">
                        <FaInstagram size="20" />
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white mx-2">
                        <FaLinkedinIn size="20" />
                    </a>
                </div>
            </div>
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center mt-4">
                <ul className="flex flex-col md:flex-row text-center md:text-left">
                    <li className="md:mr-4">
                        <a href="/privacy-policy" className="text-gray-400 hover:text-white">Privacy Policy</a>
                    </li>
                    <li className="md:mr-4">
                        <a href="/terms-and-conditions" className="text-gray-400 hover:text-white">Terms and Conditions</a>
                    </li>
                    <li className="md:mr-4">
                        <a href="/contact-us" className="text-gray-400 hover:text-white">Contact Us</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
