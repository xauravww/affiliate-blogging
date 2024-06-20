import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomeComp({ CurrentPrice, DiscountRate, Name, OldPrice, PostDate, ProductAbout, ProductTitle, blockId, id, imgUrl, ProductUrl }) {
    const navigate = useNavigate();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const [isSeeMoreActive, setisSeeMoreActive] = useState(false);
    const [data, setData] = useState(null);

    const handleRedirect = () => {
        const originalUrl = ProductUrl;
        window.location.href = ProductUrl;
    };

    const fetchData = () => {
        axios.get(`${BACKEND_URL}/blocks/${id}`).then((response) => {
            setData(response.data);
        });
    };

    const renderContent = () => {
        if (!data) return null;

        return data.data.map((item, index) => {
            const color = item?.annotations?.color;
            const href = item?.href;
            const dynamicheaderClass = `text-2xl font-medium bg-${color}-800 text-black`;

            if (href) {
                return (
                    <li key={index}><a href={href} className='text-blue-800'>{item.value}</a></li>
                );
            }
            if (color === 'green') {
                return <span key={index} className='text-blue-800'>{item.value}</span>;
            }

            if (item.type === 'paragraph' && item?.value?.includes("&DATE")) {
                const formattedDate = PostDate && !isNaN(new Date(PostDate).getTime()) ? new Date(PostDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
                item.value = item.value.replace("&DATE", `<strong>${formattedDate}</strong>`);
            }

            switch (item.type) {
                case 'heading_1':
                case 'heading_2':
                case 'heading_3':
                case 'heading_4':
                case 'heading_5':
                case 'heading_6':
                    return <h1 style={{ color: `${color === 'default' ? "black" : color || "black"}` }} className={dynamicheaderClass} key={index}>{item.value}</h1>;
                case 'bulleted_list_item':
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
        });
    };

    return (
        <div className='container min-w-[60vw] max-w-[90vw] mt-3 shadow-sm shadow-slate-400 rounded-md cursor-pointer lg:max-w-[70vw]'
            onClick={() => navigate(`/${id}`)}
        >
            <div className='item-wrapper w-full flex flex-col gap-2 rounded-md px-5 py-2 bg-white'>
                <div className='item flex justify-between gap-4'>
                    <img src={imgUrl} alt="" className='w-[20vw] h-[20vw] md:w-32 md:h-32' />
                    <div className='title-price-wrapper-outer w-full flex items-center justify-center'>
                        <div className='title-price-wrapper-inner font-bold w-full'>
                            <p>{ProductTitle}</p>
                            <div className='price-wrapper font-thin text-1xl mt-2 flex text-center flex-row flex-wrap'>
                                {CurrentPrice && (<div className='price-new text-[#ffa500]  font-bold'>₹{CurrentPrice}</div>)}
                                {OldPrice && (<div className='price-old mx-2 line-through text-slate-400'>₹{OldPrice}</div>)}
                                {DiscountRate!=="0%" && (<div className='discount-rate bg-black text-white'>{DiscountRate}</div>)}
                            </div>
                            <p className='font-normal hidden lg:block'>{ProductAbout}</p>
                        </div>
                    </div>
                </div>
                <p className='font-normal lg:hidden'>{ProductAbout}</p>
                <div className='meta-details-wrapper flex flex-row justify-between items-center relative'>
                    <p className='date italic text-slate-400 text-center'>{PostDate}</p>
                   {ProductUrl && (
                     <button className='hidden lg:block btn rounded-md bg-[#ffa500] hover:bg-[#dbaf5d] px-6 py-1 w-auto text-white' onClick={(event) => {
                        event.stopPropagation();
                        handleRedirect();
                    }}>BUY IT NOW</button>
                   )}
                    <button className='btn bg-slate-200 px-3 lg:absolute left-3 top-[-50px]' onClick={(event) => {
                        event.stopPropagation();
                        setisSeeMoreActive(!isSeeMoreActive);
                        fetchData();
                    }}>{isSeeMoreActive ? "See Less" : "See More"}</button>
                </div>
                {isSeeMoreActive && (
                    <div className='w-full'>
                        {renderContent()}
                    </div>
                )}

               {ProductUrl && (
                 <button className='btn rounded-md bg-[#ffa500] hover:bg-[#dbaf5d] px-6 py-2 w-full text-white lg:hidden' onClick={(event) => {
                    event.stopPropagation();
                    handleRedirect();
                }}>BUY IT NOW</button>
               )
               }
            </div>
        </div>
    );
}
