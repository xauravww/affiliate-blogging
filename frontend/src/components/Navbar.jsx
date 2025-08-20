import { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { searchContext } from "../context/SearchContext";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, ArrowRight } from "lucide-react";
import Logo from "../../public/assets/rupay-savvy-transparent.png";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const { searchQuery, setSearchQuery } = useContext(searchContext);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/contact-us", label: "Contact Us" },
    { href: "/affiliate-disclosure", label: "Affiliate Disclosure" },
    { href: "/privacy-policy", label: "Privacy Policy" },
  ];

  const mobileMenuVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  const mobileLinkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-lg border-b border-neutral-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left Section: Hamburger Menu & Logo */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-md text-neutral-600 hover:bg-neutral-100 transition-colors"
                aria-label="Open menu"
              >
                <Menu size={24} />
              </button>
              <Link to="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
                <img src={Logo} alt="Rupay Savvy Logo" className="h-14 w-14" />
                <span className="hidden sm:block ml-2 text-xl font-display font-semibold text-neutral-800">
                  Rupay Savvy
                </span>
              </Link>
            </div>

            {/* Center Section: Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-neutral-600 hover:text-primary-600 font-medium transition-colors relative group py-2"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* Right Section: Search */}
            <div className="flex items-center">
              {isHomePage && (
                <div className="hidden lg:block relative">
                  <input
                    type="text"
                    placeholder="Search deals..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-64 h-11 pl-10 pr-4 border border-neutral-300 rounded-xl bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-400"
                  />
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                </div>
              )}
              {isHomePage && (
                 <button
                    onClick={() => setSearchActive(true)}
                    className="lg:hidden p-2 rounded-md text-neutral-600 hover:bg-neutral-100 transition-colors"
                    aria-label="Open search"
                 >
                    <Search size={24} />
                 </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              variants={mobileMenuVariants}
              className="absolute top-0 left-0 h-full w-4/5 max-w-sm bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-neutral-200">
                <span className="font-semibold text-lg">Menu</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-md hover:bg-neutral-100"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>
              <motion.ul
                variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
                className="p-4 space-y-2"
              >
                {navLinks.map((link) => (
                  <motion.li key={link.href} variants={mobileLinkVariants}>
                    <Link
                      to={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between w-full px-4 py-3 text-lg font-medium text-neutral-700 rounded-lg hover:bg-primary-50 hover:text-primary-600"
                    >
                      {link.label}
                      <ArrowRight size={20} />
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {searchActive && isHomePage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white/80 backdrop-blur-lg"
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center gap-2">
              <div className="relative flex-grow">
                 <input
                    type="text"
                    placeholder="Search for deals, products..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full h-12 pl-12 pr-4 text-lg border-b-2 border-neutral-300 bg-transparent focus:outline-none focus:border-primary-500"
                    autoFocus
                 />
                 <Search size={22} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              </div>
              <button
                onClick={() => setSearchActive(false)}
                className="p-2 rounded-md text-neutral-600 hover:bg-neutral-100"
                aria-label="Close search"
              >
                <X size={28} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
