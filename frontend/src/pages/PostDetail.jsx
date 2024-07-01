import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { navbarContext } from '../context/NavbarContext';
import TopPosts from '../components/TopPosts';
import { Helmet } from 'react-helmet-async';

import RelatedPosts from '../components/RelatedPosts';
import Loader from '../components/Loader/Loader';

function PostDetail() {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const [post, setPost] = useState({});
    const [childrenData, setchildrenData] = useState([]);
    const [showCustomBar, setShowCustomBar] = useState(false);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState([]);
    const { id } = useParams();
    const { isNavbarVisible, setnavOverlayVisibleItems } = useContext(navbarContext);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(isNavbarVisible ? "navbar is visible" : "navbar not visible");
        setShowCustomBar(!isNavbarVisible);
    }, [isNavbarVisible]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const postResponse = await axios.get(`${BACKEND_URL}/posts/${id}`);
                const postData = postResponse.data.data;
                setPost(postData);

                // Extract and set category from post data
                const categoryFromPost = postData?.Category || [];
                setCategory(categoryFromPost);

                setnavOverlayVisibleItems({
                    "productUrl": postData?.ProductUrl ? true : false,
                    "oldPrice": postData?.OldPrice ? true : false,
                    "newPrice": postData?.CurrentPrice ? true : false
                });

                const blocksResponse = await axios.get(`${BACKEND_URL}/blocks/${id}`);
                setchildrenData(blocksResponse.data.data);
            } catch (err) {
                console.log("Error fetching data:", err);
                navigate('/page-not-found');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, navigate, BACKEND_URL, setnavOverlayVisibleItems]);

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
        <div className='bg-[#F2F2F2]'>
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <Loader/>
                </div>
            ) : (
                <div className='bg-[#F2F2F2]'>
                    {showCustomBar && (ProductUrl || CurrentPrice || OldPrice) && (
                        <div className="custom-bar-overlay fixed w-full bg-white shadow-md h-28 flex justify-end gap-10 items-center pr-8 top-0 z-10">
                            <div className="custom-bar">
                                <p>
                                    {OldPrice && (
                                        <span className='line-through'>₹{OldPrice}</span>
                                    )}
                                    {CurrentPrice && (
                                        <span className='font-bold mx-3'>₹{CurrentPrice}</span>
                                    )}
                                    {ProductUrl && (<button className='inline-block btn rounded-md bg-[#ffa500] hover:bg-[#dbaf5d] px-6 py-1 w-auto text-white' onClick={handleRedirect}>BUY IT NOW</button>)}
                                </p>
                            </div>
                        </div>
                    )}
                    <div className='flex justify-around w-full flex-col mt-3 shadow-sm shadow-slate-400 rounded-md bg-[#F2F2F2] px-5 pb-5 lg:flex-row'>
                        <Helmet>
                            <title>{ProductTitle}</title>
                            <meta name='description' content={ProductAbout} />
                        </Helmet>
                        <div className='item-wrapper w-full flex flex-col gap-2 rounded-md p-5 bg-white lg:w-[60vw]'>
                            <div className='item flex justify-between gap-4'>
                                <img src={imgUrl} alt="" className='w-[20vw] h-[20vw] md:w-32 md:h-32' />
                                <div className='title-price-wrapper-outer w-full'>
                                    <div className='title-price-wrapper-inner font-bold'>
                                        <p>{ProductTitle}</p>
                                        <div className='price-wrapper font-thin text-1xl mt-2 flex text-center flex-row flex-wrap'>
                                            {CurrentPrice && (<div className='price-new text-[#ffa500] font-bold'>₹{CurrentPrice}</div>)}
                                            {OldPrice && (<div className='price-old mx-2 line-through text-slate-400'>₹{OldPrice}</div>)}
                                            {DiscountRate !== "0%" && (<div className='discount-rate bg-black text-white'>{DiscountRate}</div>)}
                                        </div>
                                        <p className='font-normal hidden lg:block'>{ProductAbout}</p>
                                    </div>
                                </div>
                            </div>
                            <p className='font-normal lg:hidden'>{ProductAbout}</p>
                            <div className='meta-details-wrapper flex flex-row justify-between items-center relative'>
                                <p className='date italic text-slate-400 text-center'>{PostDate && !isNaN(new Date(PostDate).getTime()) ? new Date(PostDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}</p>
                                {isNavbarVisible && ProductUrl && <button className='hidden lg:block btn rounded-md bg-[#ffa500] hover:bg-[#dbaf5d] px-6 py-1 w-auto text-white' onClick={handleRedirect}>BUY IT NOW</button>}
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
                                        return <h1 className={`text-2xl font-medium text-black`} key={index}>{item.value}</h1>;
                                    case 'bulleted_list_item':
                                        return <li key={index}>{item.value}</li>;
                                    case 'numbered_list_item':
                                        return <li key={index}>{item.value}</li>;
                                    case 'paragraph':
                                        // eslint-disable-next-line no-case-declarations
                                        const textWithLinksHighlighted = item?.value?.replace(
                                            /(https?:\/\/[^\s]+)/g,
                                            '<a href="$1" target="_blank" rel="noopener noreferrer" style="color:blue;">$1</a>'
                                        );
                                        return <p key={index} dangerouslySetInnerHTML={{ __html: textWithLinksHighlighted }} />;
                                    default:
                                        return null;
                                }
                            })}
                            {ProductUrl && (
                                <button className='btn rounded-md bg-[#ffa500] px-6 py-2 w-full text-white lg:hidden' onClick={handleRedirect}>BUY IT NOW</button>
                            )}
                        </div>
                        <TopPosts />
                    </div>
                  {
                    category.length>0 && (
                        <div className='category-container my-5'>
                        <h2 className='text-2xl font-semibold mb-3 ml-5'>Tags</h2>
                        <div className='flex flex-wrap gap-2 max-w-[70%] overflow-y-scroll px-7 py-0'>
                            {category.map((cat, index) => (
                                <span key={index} className='category-box px-3 py-1 bg-blue-600 text-white rounded-lg shadow-md'>
                                    {cat}
                                </span>
                            ))}
                        </div>
                    </div>
                    )
                  }
                  {category.length>0 && (  <RelatedPosts category={category} excludeId={id} />)}
                </div>
            )}
        </div>
    );
}

export default PostDetail;