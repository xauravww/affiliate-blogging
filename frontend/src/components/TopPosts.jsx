import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader/Loader';


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

    return (
        <div className='top-offers underline-offset-4 font-normal px-8 py-8'>
            <h2 className='text-2xl'>Top Offers</h2>
            <div className={`overflow-y-${loading?'hidden':'scroll'} max-h-[70vh] lg:max-h-[180vh]`}>
                {loading ? (
                    <div className='flex justify-center items-center h-full mt-5'>
                       <Loader/>
                    </div>
                ) : (
                    <ol className='list-outside list-none'>
                        {topPosts.map((post, index) => {
                            const { id, title } = post;
                            return (
                                <li key={index} className='my-3 cursor-pointer visited:text-blue-600' onClick={() => handleNavigation(id)}>
                                    <div className="flex items-center">
                                        <span className='mr-2'>{index + 1}.</span>
                                        <span className='underline decoration-dotted'>{title}</span>
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
