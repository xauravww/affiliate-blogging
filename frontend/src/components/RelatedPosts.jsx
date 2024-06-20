import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'ldrs/bouncy';
import { useNavigate } from 'react-router-dom';

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
               
               <div className='ml-5 mt-2'><l-bouncy></l-bouncy></div>
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
        <div className="px-6 pb-4 bg-[#F2F2F2] rounded-lg shadow-lg cursor-pointer">
            <h2 className="text-2xl font-semibold mb-4 mt-4">Related Posts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map(post => (
                    <div
                        key={post.id}
                        className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                        onClick={() => handleNavigation(post.id)}
                    >
                        <img src={post.imgUrl} alt={post.title} className="w-full h-48 object-cover rounded-md mb-4" />
                        <h3 className="text-xl font-medium mb-2">{post.title}</h3>
                        {post.price && <p className="text-lg font-semibold text-green-500">₹{post.price}</p>}
                        {!post.price && <p className="text-lg font-semibold text-red-500">Read More...</p>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RelatedPosts;
