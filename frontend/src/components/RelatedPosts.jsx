import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import Loader from './Loader/Loader';

const RelatedPosts = ({ category, excludeId }) => {
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true; // Flag to check if component is mounted

        const fetchRelatedPosts = async () => {
            
            setLoading(true); // Set loading to true before fetching
            if(category==[]|| category.length==0) {
                setLoading(false)
                return
            }
            try {
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/category`, { category: JSON.stringify(category), excludeId });
                console.log(response.data.data)
                if (isMounted) { 
                    setRelatedPosts(response.data.data);
                    setLoading(false);
                }
            } catch (error) {
                if (isMounted) {
                    setError(error);
                    setLoading(false);
                }
              
            }finally{
                setLoading(false);
            }
        };

        fetchRelatedPosts();

        return () => {
            isMounted = false; // Clean up function to prevent state updates on unmounted component
        };
    }, [category,excludeId]); // Include excludeId in dependency array if it affects fetching

    const handleNavigation = (id) => {
        navigate(`/${id}`);
        window.scrollTo(0, 0); // Scroll to top on navigation
    };

    if (loading) {
        return (
            <div className='min-h-[20vh] p-6'>
                <h2 className="text-2xl font-semibold mb-4">Related Posts</h2>
               <div className='flex flex-col justify-center items-center'>
               
               <div className='ml-5 mt-2'><Loader/></div>
               </div>
               
            </div>
        );
    }
    
    if (error) {
        return (
            <div className='min-h-[20vh]'>
                <h2 className="text-2xl font-semibold mb-4">Related Posts</h2>
                <div className='ml-5 mt-2'>Error fetching related posts.</div>
                <div className='ml-5 mt-2'>{JSON.stringify(error.response?.data || error.message)}</div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-neutral-200">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-8 bg-primary-500 rounded-full"></div>
                <h2 className="text-3xl font-display font-bold text-neutral-900">Similar Products</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map(post => (
                    <div
                        key={post.id}
                        className="group bg-neutral-50 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border border-neutral-200 hover:border-primary-200"
                        onClick={() => handleNavigation(post.id)}
                    >
                        <div className="relative overflow-hidden">
                            <img
                                src={post.imgUrl}
                                alt={post.title}
                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-neutral-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors duration-200">
                                {post.title}
                            </h3>
                            <div className="flex items-center justify-between">
                                {post.price ? (
                                    <p className="text-xl font-bold text-primary-600">₹{post.price}</p>
                                ) : (
                                    <p className="text-primary-600 font-medium">Read More</p>
                                )}
                                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center group-hover:bg-primary-500 transition-colors duration-200">
                                    <span className="text-primary-600 group-hover:text-white text-sm">→</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {!relatedPosts.length && (
                    <div className="col-span-full text-center py-12">
                        <div className="text-6xl mb-4">🔍</div>
                        <p className="text-neutral-500 text-lg">No similar products found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RelatedPosts;
