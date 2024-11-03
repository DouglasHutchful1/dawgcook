import React from 'react';
import { Banner1, Banner2, Banner3, Banner4, Banner5 } from '../images';
import { motion } from 'framer-motion';

const images = [Banner1, Banner2, Banner3, Banner4, Banner5];

const Header = ({ title, image, type }) => {
  return (
    <div className='relative w-full h-screen overflow-hidden'>
      {/* Background Image */}
      <div className='absolute w-full h-full'>
        <img
          src={image ?? images[Math.floor(Math.random() * images.length)]}
          alt='Hero Image'
          className='w-full h-full object-cover brightness-75'
        />
      </div>

      {/* Dark Overlay */}
      <div className='absolute w-full h-full bg-gradient-to-b from-black to-transparent'></div>

      {/* Content */}
      <div className='relative z-10 flex flex-col items-center justify-center h-full px-4 text-center'>
        <motion.h1 
          className='text-5xl md:text-6xl lg:text-7xl font-extrabold text-white drop-shadow-lg'
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          {title}
        </motion.h1>

        {type && (
          <motion.p
            className='mt-6 text-lg md:text-xl lg:text-2xl text-white bg-opacity-70 bg-black px-8 py-4 rounded-lg shadow-md'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
          >
            Discover a treasure trove of inspiring recipes that make every meal extraordinary. <br className='hidden md:block' /> Embark on a culinary adventure from the comfort of your own kitchen!
          </motion.p>
        )}

        <motion.div 
          className='mt-8'
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8, ease: 'easeOut' }}
        >
          <button className='px-8 py-4 text-lg font-semibold text-black bg-white rounded-full hover:bg-gray-200 transition-all'>
            Explore Recipes
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Header;
