import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Oval } from 'react-loader-spinner'; // Import Oval loader

function TopPosts() {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();
    const [topPosts, setTopPosts] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchTopPosts = async () => {
            setLoading(true); // Set loading to true when fetching starts
            try {
                const response = await axios.get(`${BACKEND_URL}/top-posts`);
                console.log(response);
                const livePosts = response.data.data.filter(post => post.Status === 'LIVE');
                setTopPosts(livePosts);
            } catch (error) {
                console.log("Error fetching top posts data:", error);
            } finally {
                setLoading(false); // Set loading to false when fetching ends
            }
        };

        fetchTopPosts();
    }, [BACKEND_URL]);

    return (
        <div className='top-offers max-w-[30w] underline-offset-4 font-normal px-8 py-8'>
            <h2 className='text-2xl'>Top Offers</h2>
            <div className="overflow-y-auto max-h-[70vh] lg:max-h-[180vh]">
                {loading ? ( // Show loader while loading is true
                    <div className='flex justify-center items-center h-full mt-5'>
                        <Oval
                            visible={true}
                            height={80}
                            width={80}
                            color="#ffa500"
                            ariaLabel="oval-loading"
                            secondaryColor="#ffa500"
                        />
                    </div>
                ) : (
                    <ol className='list-outside list-decimal'>
                        {topPosts.map((post, index) => {
                            const { id, title } = post;
                            return (
                                <li
                                    key={index}
                                    className='my-3 cursor-pointer visited:text-blue-600'
                                    onClick={() => navigate(`/${id}`)}>
                                    <span className='no-underline'>{index + 1}. </span>
                                    <span className='underline decoration-dotted'>{title}</span>
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
