import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { searchContext } from "../context/SearchContext";
import { navbarContext } from "../context/NavbarContext";
import Logo from "../../public/assests/rupay-savvy-transparent.png";
import HamburgerSvg from "../../public/assests/hamburger.svg";
import { RxCross2 } from "react-icons/rx";
import { BiSearch } from "react-icons/bi";
import { animateScroll as scroll } from "react-scroll";
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
      className={`navbar flex justify-between items-center w-full px-3 h-28 bg-white shadow-md`}
      ref={elementRef}
    >
      <img
        src={HamburgerSvg}
        alt="hamburger icon"
        className={`w-10 h-10 md:w-[6vw] md:h-[6vw] lg:hidden cursor-pointer ${
          !isHomePage && "absolute left-3"
        }`}
        onClick={() => setisHoverToggled(!isHoverToggled)}
      />
      <img
        src={Logo}
        alt="logo"
        className={`w-28 h-28 cursor-pointer ${
          (!isHomePage || isSearchActive) &&
          "absolute left-1/2 transform -translate-x-1/2"
        } lg:relative lg:left-5 lg:translate-x-0`}
        onClick={handleLogoClick}
      />

      <div className="text-[1.3vw] nav-list hidden lg:block">
        <ul className="list flex flex-wrap flex-row gap-4">
          <li className={`relative ${navItemAfterHoverCSS}`}>
            <Link to="/">Home</Link>
          </li>
          <li className={`relative ${navItemAfterHoverCSS}`}>
            <Link to="/contact-us">Contact Us</Link>
          </li>
          <li className={`relative ${navItemAfterHoverCSS}`}>
            <Link to="/affiliate-disclosure">Affiliate Disclosure</Link>
          </li>
          <li className={`relative ${navItemAfterHoverCSS}`}>
            <Link to="/privacy-policy">Privacy policy</Link>
          </li>
          <li className={`relative ${navItemAfterHoverCSS}`}>
            <Link to="/disclaimer">Disclaimer</Link>
          </li>
          <li className={`relative ${navItemAfterHoverCSS}`}>
            <Link to="/terms-and-conditions">Terms and conditions</Link>
          </li>
        </ul>
      </div>

      {/* overlay */}
      <div
        className={`absolute top-0 left-0 w-full transition-all opacity-0 ease-in-out duration-500  ${
          isSearchActive
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {isSearchActive && (
          <div
            className={` bg-black opacity-85 h-28 lg:hidden transition-all `}
          >
            <RxCross2
              size={30}
              color="white"
              className="absolute right-2 top-[38%]"
              onClick={() => setisSearchActive(false)}
            />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              color="white"
              className="absolute bg-black w-[80%] h-[50%] text-white left-10 top-[25%] outline-none text-3xl"
              maxLength={25}
            />
          </div>
        )}
      </div>

      {isHomePage && (
        <>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="outline-none hidden lg:block md:w-44 md:h-10 lg:w-72 border rounded-md px-3 text-sm text-gray-700 focus:ring-1 focus:ring-blue-500"
            maxLength={25}
          />
          {!isSearchActive && (
            <BiSearch
              size={28}
              onClick={() => setisSearchActive(true)}
              className="lg:hidden"
            />
          )}
        </>
      )}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 z-10 transition-all duration-300 ease-in-out ${
          isHoverToggled
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={handleOverlayClick}
      >
        <div
          className={`absolute top-0 left-0 w-64 bg-white h-full shadow-md p-4 transition-all  duration-300 ease-in-out ${
            isHoverToggled ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <ul className="list flex flex-col gap-4 py-5">
            <li
              className={`p-2 ${
                selectedSidebar === "home" ? "bg-blue-500 text-white" : ""
              }`}
            >
              <Link
                to="/"
                onClick={() => {
                  setisHoverToggled(false);
                  setselectedSidebar("home");
                }}
              >
                Home
              </Link>
            </li>
            <li
              className={`p-2 ${
                selectedSidebar === "contact-us" ? "bg-blue-500 text-white" : ""
              }`}
            >
              <Link
                to="/contact-us"
                onClick={() => {
                  setisHoverToggled(false);
                  setselectedSidebar("contact-us");
                }}
              >
                Contact Us
              </Link>
            </li>
            <li
              className={`p-2 ${
                selectedSidebar === "affiliate-disclosure"
                  ? "bg-blue-500 text-white"
                  : ""
              }`}
            >
              <Link
                to="/affiliate-disclosure"
                onClick={() => {
                  setisHoverToggled(false);
                  setselectedSidebar("affiliate-disclosure");
                }}
              >
                Affiliate Disclosure
              </Link>
            </li>
            <li
              className={`p-2 ${
                selectedSidebar === "privacy-policy"
                  ? "bg-blue-500 text-white"
                  : ""
              }`}
            >
              <Link
                to="/privacy-policy"
                onClick={() => {
                  setisHoverToggled(false);
                  setselectedSidebar("privacy-policy");
                }}
              >
                Privacy policy
              </Link>
            </li>
            <li
              className={`p-2 ${
                selectedSidebar === "disclaimer" ? "bg-blue-500 text-white" : ""
              }`}
            >
              <Link
                to="/disclaimer"
                onClick={() => {
                  setisHoverToggled(false);
                  setselectedSidebar("disclaimer");
                }}
              >
                Disclaimer
              </Link>
            </li>
            <li
              className={`p-2 ${
                selectedSidebar === "terms-and-conditions"
                  ? "bg-blue-500 text-white"
                  : ""
              }`}
            >
              <Link
                to="/terms-and-conditions"
                onClick={() => {
                  setisHoverToggled(false);
                  setselectedSidebar("terms-and-conditions");
                }}
              >
                Terms and conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <img
      src="../../public/assests/arrow-up.svg"
      className={`h-10 w-10 fixed bottom-10 right-10 z-[15] transition-transform duration-300 ease-in-out ${isHoverScrollToTopIcon ? "scale-125" : "scale-100"}`}
      onClick={() => {
        scroll.scrollToTop()
      }}
      alt="Scroll to top"
      onMouseEnter={() => setIsHoverScrollToTopIcon(true)}
      onMouseLeave={() => setIsHoverScrollToTopIcon(false)}
    />
    </nav>
  );
}

export default Navbar;
