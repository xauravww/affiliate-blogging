import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Import Link, useNavigate, and useLocation from react-router-dom
import { searchContext } from '../context/SearchContext';
import { navbarContext } from '../context/NavbarContext';
import Logo from "../../public/assests/rupay-savvy-transparent.png";

function Navbar() {
    const elementRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [isHoverToggled, setisHoverToggled] = useState(false);

    const navItemAfterHoverCSS = "after:absolute after:bg-[#123] after:content-[''] after:h-1 after:w-0 after:left-0 after:bottom-[-10px] hover:after:w-full after:transition-all after:duration-300 after:ease-in-out";
    const { searchQuery, setSearchQuery } = useContext(searchContext);
    const { isNavbarVisible, setisNavbarVisible } = useContext(navbarContext);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setisNavbarVisible(true);
                    } else {
                        setisNavbarVisible(false);
                    }
                });
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.5,
            }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, []);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            setisHoverToggled(false); // Close the overlay if clicked outside the menu
        }
    };

    const handleLogoClick = () => {
        navigate('/'); // Navigate to the Home page
        setisHoverToggled(false); // Close the overlay
    };

    const isHomePage = location.pathname === "/";

    return (
        <nav className={`navbar flex justify-between items-center w-full px-3 h-28 bg-white shadow-md`} ref={elementRef}>
            <img src="../public/assests/hamburger.svg" alt="hamburger icon" className={`w-10 h-10 md:w-[6vw] md:h-[6vw] lg:hidden cursor-pointer ${!isHomePage && 'absolute left-3'}`} onClick={() => setisHoverToggled(!isHoverToggled)} />
            <img src={Logo} alt="logo" className={`w-28 h-28 cursor-pointer ${!isHomePage && 'absolute left-1/2 transform -translate-x-1/2'} lg:relative lg:left-5 lg:translate-x-0`} onClick={handleLogoClick} />

            <div className='text-[1.3vw] nav-list hidden lg:block'>
                <ul className='list flex flex-wrap flex-row gap-4'>
                    <li className={`relative ${navItemAfterHoverCSS}`}><Link to="/">Home</Link></li>
                    <li className={`relative ${navItemAfterHoverCSS}`}><Link to="/contact-us">Contact Us</Link></li>
                    <li className={`relative ${navItemAfterHoverCSS}`}><Link to="/affiliate-disclosure">Affiliate Disclosure</Link></li>
                    <li className={`relative ${navItemAfterHoverCSS}`}><Link to="/privacy-policy">Privacy policy</Link></li>
                    <li className={`relative ${navItemAfterHoverCSS}`}><Link to="/disclaimer">Disclaimer</Link></li>
                    <li className={`relative ${navItemAfterHoverCSS}`}><Link to="/terms-and-conditions">Terms and conditions</Link></li>
                </ul>
            </div>

            {isHomePage && (
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className='outline-none w-20 h-[5vw] md:w-28 md:h-10 lg:w-36 border rounded-md px-3 text-sm text-gray-700 focus:ring-1 focus:ring-blue-500'
                />
            )}
            {isHoverToggled && (
                <div className='fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 z-10 transition-transform transform duration-300 ease-in-out' onClick={handleOverlayClick}>
                    <div className='absolute top-0 left-0 w-64 bg-white h-full shadow-md p-4 transform translate-x-0 transition-transform duration-300 ease-in-out'>
                        <ul className='list flex flex-col gap-4'>
                            <li><Link to="/" onClick={() => setisHoverToggled(false)}>Home</Link></li>
                            <li><Link to="/contact-us" onClick={() => setisHoverToggled(false)}>Contact Us</Link></li>
                            <li><Link to="/affiliate-disclosure" onClick={() => setisHoverToggled(false)}>Affiliate Disclosure</Link></li>
                            <li><Link to="/privacy-policy" onClick={() => setisHoverToggled(false)}>Privacy policy</Link></li>
                            <li><Link to="/disclaimer" onClick={() => setisHoverToggled(false)}>Disclaimer</Link></li>
                            <li><Link to="/terms-and-conditions" onClick={() => setisHoverToggled(false)}>Terms and conditions</Link></li>
                        </ul>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
