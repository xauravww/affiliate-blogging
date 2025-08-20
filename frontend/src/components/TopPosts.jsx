import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Shimmer from "./ShimmerUIs/ShimmerTopPostsComp"
function TopPosts() {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();
    const [topPosts, setTopPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopPosts = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${BACKEND_URL}/top-posts`);
                const livePosts = response.data.data.filter(post => post.Status === 'LIVE');
                setTopPosts(livePosts);
            } catch (error) {
                console.log("Error fetching top posts data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTopPosts();
    }, [BACKEND_URL]);

    const handleNavigation = (id) => {
        navigate(`/${id}`);
    };

    return(
        <div className='top-offers font-normal px-4 md:px-8'>
            <h2 className='text-2xl mt-6 mb-4 font-bold text-neutral-800'>Top Offers</h2>
            <div className={`overflow-y-auto max-h-[70vh] lg:max-h-[180vh]`}>
                {loading ? (
                    <div className='flex justify-center items-center h-full mt-5'>
                        <Shimmer />
                    </div>
                ) : (
                    <ol className='list-outside list-none space-y-3'>
                        {topPosts.map((post, index) => {
                            const { id, title } = post;
                            return (
                                <li key={id} className='cursor-pointer group' onClick={() => handleNavigation(id)}>
                                    <div className="flex items-start">
                                        <span className='mr-3 text-neutral-500 font-medium'>{index + 1}.</span>
                                        {/* --- MODIFIED: Added break-words to prevent long titles from overflowing --- */}
                                        <span className='underline decoration-dotted group-hover:text-primary-600 transition-colors break-words'>
                                            {title}
                                        </span>
                                    </div>
                                </li>
                            );
                        })}
                    </ol>
                )}
            </div>
        </div>
    );
}

export default TopPosts;
