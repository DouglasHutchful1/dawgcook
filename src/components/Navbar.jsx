import React, { useState, useEffect } from 'react';
import { HiMenuAlt3 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faMagnifyingGlass, faHome } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom'; 
const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [scrolling, setScrolling] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolling(window.scrollY > 0);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 w-full z-20 transition-all duration-300 ${
                scrolling ? 'bg-black opacity-90 shadow-lg' : 'bg-transparent'
            }`}
        >
            <nav className='flex items-center justify-between py-3 px-4 md:px-20'>
                {/* Logo */}
                <Link to="/" className='flex items-center text-white text-lg space-x-2'>
                    <FontAwesomeIcon icon={faUtensils} className="text-xl md:text-2xl" />
                    <span className="hidden md:block font-semibold">DawgCook</span>
                </Link>

                {/* Desktop Links and Search */}
                <div className='hidden md:flex items-center gap-6'>
                    <ul className='flex items-center text-white gap-6'>
                        <li className='flex items-center gap-2 text-lg cursor-pointer transition hover:text-red-400'>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                            <Link to="/#recipes">Discover Recipes</Link>
                        </li>
                    </ul>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className='md:hidden text-white text-2xl z-40' // Set a higher z-index here
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                >
                    {open ? <AiOutlineClose /> : <HiMenuAlt3 />}
                </button>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ y: "-100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-100%" }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className='md:hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex flex-col items-center justify-center text-white text-xl space-y-8 z-30' // Set a lower z-index here
                    >
                        {/* Logo in Mobile Menu */}
                        <Link to="/" className='flex items-center text-white text-2xl space-x-2 mb-8'>
                            <FontAwesomeIcon icon={faUtensils} />
                            <span>DawgCook</span>
                        </Link>

                        {/* Menu Items with Icons */}
                        <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faHome} />
                            Home
                        </Link>
                        <Link to="/#recipes" onClick={() => setOpen(false)} className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                            Discover Recipes
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
