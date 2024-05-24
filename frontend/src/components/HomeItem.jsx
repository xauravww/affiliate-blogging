import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function HomeComp({ CurrentPrice, DiscountRate, Name, OldPrice, PostDate, ProductAbout, ProductTitle, blockId, id, imgUrl,ProductUrl }) {

    const [isSeeMoreActive, setisSeeMoreActive] = useState(false);
    const [data, setData] = useState(null);

    const handleRedirect = () => {
        const originalUrl = ProductUrl;
        const convertedUrl = originalUrl.startsWith('http') ? originalUrl : `https://${originalUrl.replace(/^www\./,'')}`;
        window.location.href = convertedUrl;
    };
    

    const fetchData = () => {
        axios.get(`http://localhost:8000/blocks/${id}`).then((response) => {
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
        <div className='container w-full mt-3 shadow-sm shadow-slate-400 rounded-md'>
            <div className='item-wrapper w-full flex flex-col gap-2 rounded-md px-5 py-2 bg-white'>
                <div className='item flex justify-between gap-4'>
                    <img src={imgUrl} alt="" className='w-[20vw] h-[20vw] md:w-32 md:h-32' />
                    <div className='title-price-wrapper-outer w-full flex items-center justify-center'>
                        <div className='title-price-wrapper-inner font-bold w-full'>
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
                    <p className='date italic text-slate-400 text-center'>{PostDate}</p>
                    <button className='hidden lg:block btn rounded-md bg-[#ffa500] px-6 py-1 w-auto text-white' onClick={handleRedirect}>BUY IT NOW</button>
                    <button className='btn bg-slate-200 px-3 lg:absolute left-3 top-[-50px]' onClick={() => {
                        setisSeeMoreActive(!isSeeMoreActive);
                        fetchData();
                    }}>{isSeeMoreActive ? "See Less" : "See More"}</button>
                </div>
                {isSeeMoreActive && (
                    <div className='w-full'>
                        {renderContent()}
                    </div>
                )}
                <button className='btn rounded-md bg-[#ffa500] px-6 py-2 w-full text-white lg:hidden' onClick={handleRedirect}>BUY IT NOW</button>
            </div>
        </div>
    );
}
