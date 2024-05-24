import React,{useState,useEffect} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
function TopPosts() {
    const navigate = useNavigate()
    const [topPosts, setTopPosts] = useState([]);
    useEffect(() => {
        try {
            axios.get("http://localhost:8000/top-posts").then((response) => {
                console.log(response.data);
                setTopPosts(response.data.data);
            });
        } catch (error) {
            console.log(error);
        }
    }, []);
  return (
    <div className='top-offers  w-full underline-offset-4 font-normal px-8'>
                    <h2 className='text-2xl my-6'>Top Offers</h2>
                    <ol  className=' list-decimal '>
                        {
                            topPosts.map((post ,index)=>{
                                const {id, title} = post
                                return (
                                    
                                        <li key={index} className='my-3 underline cursor-pointer visited:text-blue-600' onClick={()=> navigate(`/${id}`) }>{title}</li>
                                  
                                )
                            })
                        }
                          </ol>
                </div>
  )
}

export default TopPosts
