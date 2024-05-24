import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TopPosts() {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();
    const [topPosts, setTopPosts] = useState([]);

    useEffect(() => {
        try {
            axios.get(`${BACKEND_URL}/top-posts`).then((response) => {
                console.log(response.data);
                setTopPosts(response.data.data);
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <div className='top-offers w-full underline-offset-4 font-normal px-8 py-8'>
            <h2 className='text-2xl '>Top Offers</h2>
            <div className="overflow-y-auto max-h-[70vh] lg:max-h-[180vh]"> 
                <ol className='list-decimal'>
                    {topPosts.map((post, index) => {
                        const { id, title } = post;
                        return (
                            <li
                                key={index}
                                className='my-3 underline cursor-pointer visited:text-blue-600'
                                onClick={() => navigate(`/${id}`)}>
                                {index + 1}. {title} 
                            </li>
                        );
                    })}
                </ol>
            </div>
        </div>
    );
}

export default TopPosts;
