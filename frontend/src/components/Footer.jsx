import React, { useContext } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn ,FaPinterest } from 'react-icons/fa';
import { navbarContext } from '../context/NavbarContext';
import { Link } from 'react-router-dom';

function Footer() {
    const { isNavbarVisible, setisNavbarVisible,isHoverToggled, setisHoverToggled,isSearchActive, setisSearchActive,selectedSidebar, setselectedSidebar} = useContext(navbarContext)

    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                <div className="text-center md:text-left">
                    <h2 className="text-2xl font-bold mb-4">Rupay Savvy</h2>
                    <p className="text-gray-400">&copy; {new Date().getFullYear()} Rupay Savvy. All rights reserved.</p>
                </div>
                <div className="flex justify-center md:justify-end mt-4 md:mt-0">
                    <a href={import.meta.env.VITE_FB_URL} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white mx-2">
                        <FaFacebookF size="20" />
                    </a>
                    <a href={import.meta.env.VITE_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white mx-2">
                        <FaInstagram size="20" />
                    </a>
                    <a href={import.meta.env.VITE_LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white mx-2">
                        <FaLinkedinIn size="20" />
                    </a>
                    <a href={import.meta.env.VITE_PINTEREST_URL} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white mx-2">
                        <FaPinterest size="20" />
                    </a>
                </div>
            </div>
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center mt-4">
                <ul className="flex flex-col md:flex-row text-center md:text-left">
                    <li className="md:mr-4" onClick={()=>setselectedSidebar("privacy-policy")}>
                        <Link to="/privacy-policy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
                    </li>
                    <li className="md:mr-4" onClick={()=>setselectedSidebar("terms-and-conditions")}>
                        <Link to="/terms-and-conditions" className="text-gray-400 hover:text-white">Terms and Conditions</Link>
                    </li>
                    <li className="md:mr-4" onClick={()=>setselectedSidebar("contact-us")}>
                        <Link to="/contact-us" className="text-gray-400 hover:text-white">Contact Us</Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
