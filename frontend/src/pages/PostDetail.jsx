import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';  
import { navbarContext } from '../context/NavbarContext';
import TopPosts from '../components/TopPosts';
import { Helmet } from 'react-helmet-async';
import Footer from '../components/Footer';

function PostDetail() {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const [post, setPost] = useState({});
    const [childrenData, setchildrenData] = useState([]);
    const [showCustomBar, setShowCustomBar] = useState(false);
    const { id } = useParams();
    const { isNavbarVisible } = useContext(navbarContext);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(isNavbarVisible ? "navbar is visible" : "navbar not visible");
        setShowCustomBar(!isNavbarVisible);
    }, [isNavbarVisible]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const postResponse = await axios.get(`${BACKEND_URL}/posts/${id}`);
                setPost(postResponse.data.data);

                const blocksResponse = await axios.get(`${BACKEND_URL}/blocks/${id}`);
                setchildrenData(blocksResponse.data.data);
            } catch (err) {
                console.log("Error fetching data");
                navigate('/page-not-found');
            }
        };

        fetchData();
    }, [id, navigate, BACKEND_URL]);

    useEffect(() => {
        console.log(childrenData);
    }, [childrenData]);

    const {
        CurrentPrice,
        PostDate,
        OldPrice,
        ProductTitle,
        DiscountRate,
        ProductAbout,
        imgUrl,
        ProductUrl
    } = post;

    const handleRedirect = () => {
        window.location.href = ProductUrl;
    };

    return (
      <div>
          {showCustomBar && (
              <div className="custom-bar-overlay fixed w-full bg-white shadow-md h-28 flex justify-end gap-10 items-center pr-8 top-0 z-10">
                  <div className="custom-bar">
                      <p>
                          <span className='line-through'>₹{OldPrice}</span>
                          <span className='font-bold mx-3'>₹{CurrentPrice}</span>
                          <button className='inline-block btn rounded-md bg-[#ffa500] hover:bg-[#dbaf5d] px-6 py-1 w-auto text-white' onClick={handleRedirect}>BUY IT NOW</button>
                      </p>
                  </div>
              </div>
          )}
          <div className='flex justify-between w-full flex-col mt-3 shadow-sm shadow-slate-400 rounded-md bg-[#F2F2F2] px-5 pb-5 lg:flex-row'>
            <Helmet>
                <title>{ProductTitle}</title>
                <meta name='description' content={ProductAbout}/>
            </Helmet>
            <div className='item-wrapper flex flex-col gap-2 rounded-md p-5 bg-white'>
                <div className='item flex justify-between gap-4'>
                    <img src={imgUrl} alt="" className='w-[20vw] h-[20vw] md:w-32 md:h-32' />
                    <div className='title-price-wrapper-outer w-full'>
                        <div className='title-price-wrapper-inner font-bold'>
                            <p>{ProductTitle}</p>
                            <div className='price-wrapper font-thin text-1xl mt-2 flex text-center flex-row flex-wrap'>
                                <div className='price-new text-[#ffa500] font-bold'>₹{CurrentPrice}</div>
                                <div className='price-old mx-2 line-through text-slate-400'>₹{OldPrice}</div>
                                <div className='discount-rate bg-black text-white'>{DiscountRate}</div>
                            </div>
                            <p className='font-normal hidden lg:block'>{ProductAbout}</p>
                        </div>
                    </div>
                </div>
                <p className='font-normal lg:hidden'>{ProductAbout}</p>
                <div className='meta-details-wrapper flex flex-row justify-between items-center relative'>
                    <p className='date italic text-slate-400 text-center'>{PostDate && !isNaN(new Date(PostDate).getTime()) ? new Date(PostDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}</p>
                    {isNavbarVisible && <button className='hidden lg:block btn rounded-md bg-[#ffa500] hover:bg-[#dbaf5d] px-6 py-1 w-auto text-white' onClick={handleRedirect}>BUY IT NOW</button>}
                </div>
                {childrenData.map((item, index) => {
                    const color = item?.annotations?.color || 'black';

                    if (item.type === 'paragraph' && item?.value?.includes("&DATE")) {
                        const formattedDate = PostDate && !isNaN(new Date(PostDate).getTime()) ? new Date(PostDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
                        item.value = item.value.replace("&DATE", `<strong>${formattedDate}</strong>`);
                    }

                    if (item.type === 'heading_1') {
                        return <h1 className={`text-3xl`} style={{ color: `${color === 'default' ? "black" : color || "black"}` }} key={index}>{item.value}</h1>;
                    }

                    if (item.href) {
                        return (
                            <li key={index}><a href={item.href} className='text-blue-800'>{item.value}</a></li>
                        );
                    }

                    if (color === 'green') {
                        return <span key={index} className='text-green-800'>{item.value}</span>;
                    }

                    if (color === 'red') {
                        return <span key={index} className='text-red-800'>{item.value}</span>;
                    }

                    switch (item.type) {
                        case 'heading_2':
                        case 'heading_3':
                        case 'heading_4':
                        case 'heading_5':
                        case 'heading_6':
                            return <h1 className={`text-2xl font-medium bg-${color === 'orange' ? "orange" : "black"} text-black`} key={index}>{item.value}</h1>;
                        case 'bulleted_list_item':
                            return <li key={index}>{item.value}</li>;
                        case 'numbered_list_item':
                            return <li key={index}>{item.value}</li>;
                        case 'paragraph':
                            const textWithLinksHighlighted = item?.value?.replace(
                                /(https?:\/\/[^\s]+)/g,
                                '<a href="$1" target="_blank" rel="noopener noreferrer" style="color:blue;">$1</a>'
                            );
                            return <p key={index} dangerouslySetInnerHTML={{ __html: textWithLinksHighlighted }} />;
                        default:
                            return null;
                    }
                })}
                <button className='btn rounded-md bg-[#ffa500] px-6 py-2 w-full text-white lg:hidden' onClick={handleRedirect}>BUY IT NOW</button>
            </div>
            <TopPosts />
        </div>
        <Footer/>
      </div>
    );
}

export default PostDetail;
