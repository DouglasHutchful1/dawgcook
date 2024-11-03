import React, { useEffect, useState, useCallback } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import Loading from './Loading';
import Searchbar from './SearchBar';
import RecipeCard from './RecipeCard';
import { fetchRecipes } from '../utils';
import Button from './Button';
import { motion } from 'framer-motion';

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [query, setQuery] = useState('Tea'); // The query for fetching recipes
    const [limit, setLimit] = useState(30); // Limit for recipes
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState(''); // Local state for input

    const handleChange = (e) => {
        setInputValue(e.target.value); // Update the input value
    };

    // Wrap fetchRecipe in useCallback to maintain stable reference
    const fetchRecipe = useCallback(async () => {
        try {
            setLoading(true);
            const data = await fetchRecipes({ query, limit });
            setRecipes(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, [query, limit]);

    const handleSearchedRecipe = (e) => {
        e.preventDefault(); 
        setQuery(inputValue); // Set query to the input value
        setLimit(30); // Reset limit when a new search is made
        fetchRecipe(); // Trigger fetchRecipe on search
    };

    const showMore = () => {
        setLimit((prev) => prev + 10);
    };

    // Fetch recipes when component mounts or when limit changes
    useEffect(() => {
        fetchRecipe(); // Call fetchRecipe on initial load or limit change
    }, [fetchRecipe, limit]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className='w-full'>
            {/* Search Bar */}
            <div className='w-full flex items-center justify-center pt-10 pb-5 px-0 md:px-10'>
                <form className='w-full lg:w-2/4' onSubmit={handleSearchedRecipe}>
                    <Searchbar
                        placeholder="Search for any recipe"
                        handleInputChange={handleChange} // Handle input changes
                        value={inputValue} // Bind the input value to local state
                        rightIcon={
                            <BiSearchAlt2
                                className='text-gray-600 cursor-pointer hover:text-gray-800 transition'
                                onClick={handleSearchedRecipe} // Call search on icon click
                            />
                        }
                    />
                </form>
            </div>

            {/* Recipes Section */}
            {recipes.length > 0 ? (
                <>
                    <motion.div 
                        className='w-full flex justify-center'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className='max-w-screen-lg w-full px-4 lg:px-10 py-10'>
                            <motion.div 
                                className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10'
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    hidden: { opacity: 0, scale: 0.9 },
                                    visible: { opacity: 1, scale: 1, transition: { staggerChildren: 0.1 } },
                                }}
                            >
                                {recipes.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                    >
                                        <RecipeCard recipe={item} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Load More Button */}
                    <div className='flex w-full items-center justify-center py-10'>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <Button
                                title="Load More"
                                containerStyle="bg-blue-500 text-white px-4 py-2 rounded-full text-sm hover:bg-green-600 transition-all"
                                handleClick={showMore}
                            />
                        </motion.div>
                    </div>
                </>
            ) : (
                <div className='text-white w-full flex items-center justify-center py-10'>
                    <p className='text-center text-lg'>No Recipes Found</p>
                </div>
            )}
        </div>
    );
};

export default Recipes;
