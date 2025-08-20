import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { searchContext } from "../context/SearchContext";
import { navbarContext } from "../context/NavbarContext";
import Logo from "../../public/assets/rupay-savvy-transparent.png";
import HamburgerSvg from "../../public/assets/hamburger.svg";
import { RxCross2 } from "react-icons/rx";
import { BiSearch } from "react-icons/bi";
import { animateScroll as scroll } from "react-scroll";
import scrolltoTopIcon from "/assets/arrow-up.svg"
function Navbar() {
  const elementRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [isHoverScrollToTopIcon, setIsHoverScrollToTopIcon] = useState(false);
  // const [isSearchActive, setisSearchActive] = useState(false);
  // const [selectedSidebar, setselectedSidebar] = useState("home")

  const {
    isNavbarVisible,
    setisNavbarVisible,
    isHoverToggled,
    setisHoverToggled,
    isSearchActive,
    setisSearchActive,
    selectedSidebar,
    setselectedSidebar,
    navOverlayVisibleItems,
  } = useContext(navbarContext);

  const navItemAfterHoverCSS =
    "after:absolute after:bg-[#123] after:content-[''] after:h-1 after:w-0 after:left-0 after:bottom-[-10px] hover:after:w-full after:transition-all after:duration-300 after:ease-in-out";
  const { searchQuery, setSearchQuery } = useContext(searchContext);
  // const { isNavbarVisible, setisNavbarVisible } = useContext(navbarContext);

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
        rootMargin: "0px",
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
    navigate("/"); // Navigate to the Home page
    setisHoverToggled(false); // Close the overlay
  };

  const isHomePage = location.pathname === "/";

  return (
    <nav
      className={`navbar flex justify-between items-center w-full px-4 lg:px-8 h-20 bg-white/95 backdrop-blur-sm shadow-soft border-b border-neutral-200 sticky top-0 z-40`}
      ref={elementRef}
    >
      <button
        aria-label="Open navigation menu"
        className={`w-8 h-8 lg:hidden cursor-pointer transition-all duration-200 hover:scale-110 ${
          !isHomePage && "absolute left-4"
        }`}
        onClick={() => setisHoverToggled(!isHoverToggled)}
      >
        <img
          src={HamburgerSvg}
          alt=""
          className="w-full h-full"
        />
      </button>

      <div className={`flex items-center ${
        (!isHomePage || isSearchActive) &&
        "absolute left-1/2 transform -translate-x-1/2"
      } lg:relative lg:left-0 lg:translate-x-0`}>
        <img
          src={Logo}
          alt="Rupay Savvy Logo"
          className="w-16 h-16 cursor-pointer transition-transform duration-200 hover:scale-105"
          onClick={handleLogoClick}
        />
        <span className="ml-3 text-xl font-display font-semibold text-neutral-800 hidden sm:block">
          Rupay Savvy
        </span>
      </div>

      <div className="nav-list hidden lg:block">
        <ul className="flex flex-wrap gap-8">
          <li className="relative group">
            <Link
              to="/"
              className="text-neutral-700 hover:text-primary-600 font-medium transition-colors duration-200 py-2 relative"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li className="relative group">
            <Link
              to="/contact-us"
              className="text-neutral-700 hover:text-primary-600 font-medium transition-colors duration-200 py-2 relative"
            >
              Contact Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li className="relative group">
            <Link
              to="/affiliate-disclosure"
              className="text-neutral-700 hover:text-primary-600 font-medium transition-colors duration-200 py-2 relative"
            >
              Affiliate Disclosure
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li className="relative group">
            <Link
              to="/privacy-policy"
              className="text-neutral-700 hover:text-primary-600 font-medium transition-colors duration-200 py-2 relative"
            >
              Privacy Policy
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Search Overlay */}
      <div
        className={`absolute top-0 left-0 w-full h-20 bg-white/95 backdrop-blur-sm border-b border-neutral-200 lg:hidden transition-all duration-300 z-50 ${
          isSearchActive
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {isSearchActive && (
          <div className="flex items-center h-full px-4 gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search deals, products..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full h-12 pl-12 pr-4 border border-neutral-300 rounded-xl bg-neutral-50 text-neutral-700 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                maxLength={25}
                autoFocus
              />
              <BiSearch
                size={20}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400"
              />
            </div>
            <button
              aria-label="Close search"
              onClick={() => setisSearchActive(false)}
              className="p-2 rounded-full hover:bg-neutral-100 transition-colors duration-200"
            >
              <RxCross2 size={24} className="text-neutral-600" />
            </button>
          </div>
        )}
      </div>

      {isHomePage && (
        <div className="flex items-center gap-4">
          <div className="relative hidden lg:block">
            <input
              type="text"
              placeholder="Search deals, products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-80 h-11 pl-12 pr-4 border border-neutral-300 rounded-xl bg-neutral-50 text-neutral-700 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              maxLength={25}
            />
            <BiSearch
              size={20}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400"
            />
          </div>
          {!isSearchActive && (
            <button
              aria-label="Open search"
              onClick={() => setisSearchActive(true)}
              className="lg:hidden p-2 rounded-full hover:bg-neutral-100 transition-colors duration-200"
            >
              <BiSearch size={24} className="text-neutral-600" />
            </button>
          )}
        </div>
      )}
      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black/60 backdrop-blur-sm z-50 transition-all duration-300 ease-in-out ${
          isHoverToggled
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={handleOverlayClick}
      >
        <div
          className={`absolute top-0 left-0 w-80 max-w-[85vw] bg-white h-full shadow-2xl transition-all duration-300 ease-in-out ${
            isHoverToggled ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-200">
              <div className="flex items-center">
                <img src={Logo} alt="Rupay Savvy" className="w-12 h-12" />
                <span className="ml-3 text-xl font-display font-semibold text-neutral-800">
                  Rupay Savvy
                </span>
              </div>
              <button
                onClick={() => setisHoverToggled(false)}
                className="p-2 rounded-full hover:bg-neutral-100 transition-colors duration-200"
                aria-label="Close menu"
              >
                <RxCross2 size={24} className="text-neutral-600" />
              </button>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 overflow-y-auto">
              <ul className="space-y-1">
                <li>
                  <Link
                    to="/"
                    onClick={() => {
                      setisHoverToggled(false);
                      setselectedSidebar("home");
                    }}
                    className={`flex items-center px-4 py-4 rounded-xl transition-all duration-200 font-medium ${
                      selectedSidebar === "home"
                        ? "bg-primary-500 text-white shadow-lg"
                        : "text-neutral-700 hover:bg-primary-50 hover:text-primary-600"
                    }`}
                  >
                    <span className="text-lg">🏠</span>
                    <span className="ml-3">Home</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact-us"
                    onClick={() => {
                      setisHoverToggled(false);
                      setselectedSidebar("contact-us");
                    }}
                    className={`flex items-center px-4 py-4 rounded-xl transition-all duration-200 font-medium ${
                      selectedSidebar === "contact-us"
                        ? "bg-primary-500 text-white shadow-lg"
                        : "text-neutral-700 hover:bg-primary-50 hover:text-primary-600"
                    }`}
                  >
                    <span className="text-lg">📞</span>
                    <span className="ml-3">Contact Us</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/affiliate-disclosure"
                    onClick={() => {
                      setisHoverToggled(false);
                      setselectedSidebar("affiliate-disclosure");
                    }}
                    className={`flex items-center px-4 py-4 rounded-xl transition-all duration-200 font-medium ${
                      selectedSidebar === "affiliate-disclosure"
                        ? "bg-primary-500 text-white shadow-lg"
                        : "text-neutral-700 hover:bg-primary-50 hover:text-primary-600"
                    }`}
                  >
                    <span className="text-lg">📋</span>
                    <span className="ml-3">Affiliate Disclosure</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy-policy"
                    onClick={() => {
                      setisHoverToggled(false);
                      setselectedSidebar("privacy-policy");
                    }}
                    className={`flex items-center px-4 py-4 rounded-xl transition-all duration-200 font-medium ${
                      selectedSidebar === "privacy-policy"
                        ? "bg-primary-500 text-white shadow-lg"
                        : "text-neutral-700 hover:bg-primary-50 hover:text-primary-600"
                    }`}
                  >
                    <span className="text-lg">🔒</span>
                    <span className="ml-3">Privacy Policy</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/disclaimer"
                    onClick={() => {
                      setisHoverToggled(false);
                      setselectedSidebar("disclaimer");
                    }}
                    className={`flex items-center px-4 py-4 rounded-xl transition-all duration-200 font-medium ${
                      selectedSidebar === "disclaimer"
                        ? "bg-primary-500 text-white shadow-lg"
                        : "text-neutral-700 hover:bg-primary-50 hover:text-primary-600"
                    }`}
                  >
                    <span className="text-lg">⚠️</span>
                    <span className="ml-3">Disclaimer</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms-and-conditions"
                    onClick={() => {
                      setisHoverToggled(false);
                      setselectedSidebar("terms-and-conditions");
                    }}
                    className={`flex items-center px-4 py-4 rounded-xl transition-all duration-200 font-medium ${
                      selectedSidebar === "terms-and-conditions"
                        ? "bg-primary-500 text-white shadow-lg"
                        : "text-neutral-700 hover:bg-primary-50 hover:text-primary-600"
                    }`}
                  >
                    <span className="text-lg">📄</span>
                    <span className="ml-3">Terms & Conditions</span>
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Footer */}
            <div className="pt-4 border-t border-neutral-200 mt-auto">
              <p className="text-sm text-neutral-500 text-center">
                © 2024 Rupay Savvy
              </p>
            </div>
          </div>
        </div>
      </div>
    
    </nav>
  );
}

export default Navbar;
