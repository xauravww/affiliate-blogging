import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TopPosts() {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();
    const [topPosts, setTopPosts] = useState([]);

    useEffect(() => {
        const fetchTopPosts = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/top-posts`);
                console.log(response);
                const livePosts = response.data.data.filter(post => post.Status === 'LIVE');
                setTopPosts(livePosts);
            } catch (error) {
                console.log("Error fetching top posts data:", error);
            }
        };

        fetchTopPosts();
    }, [BACKEND_URL]);

    return (
        <div className='top-offers w-full underline-offset-4 font-normal px-8 py-8'>
            <h2 className='text-2xl'>Top Offers</h2>
            <div className="overflow-y-auto max-h-[70vh] lg:max-h-[180vh]">
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
            </div>
        </div>
    );
}

export default TopPosts;
