/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';

export default function HomeComp({ CurrentPrice, DiscountRate, OldPrice, PostDate, ProductAbout, ProductTitle, id, imgUrl, ProductUrl }) {
    const navigate = useNavigate();

    const handleRedirect = () => {
        window.location.href = ProductUrl;
    };



    return (
        <div className='container min-w-[60vw] max-w-[90vw] mt-3 shadow-sm shadow-slate-400 rounded-md cursor-pointer lg:max-w-[60vw] lg:min-w-[60vw]'
            onClick={() => navigate(`/${id}`)}
        >
            <div className='item-wrapper w-full flex flex-col gap-2 rounded-md px-5 py-2 bg-white'>
                <div className='item flex justify-between gap-4'>
                    <img src={imgUrl} alt="" className='w-[20vw] h-[20vw] md:w-32 md:h-32' />
                    <div className='title-price-wrapper-outer w-full flex items-center justify-center'>
                        <div className='title-price-wrapper-inner font-bold w-full'>
                            <p>{ProductTitle}</p>
                            <div className='price-wrapper font-thin text-1xl mt-2 flex text-center flex-row flex-wrap items-center gap-2'>
                                {CurrentPrice && (<div className='price-new text-primary-600 font-bold text-xl'>₹{CurrentPrice}</div>)}
                                {OldPrice && (<div className='price-old line-through text-neutral-400'>₹{OldPrice}</div>)}
                                {DiscountRate!=="0%" && (<div className='discount-rate bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold'>{DiscountRate} OFF</div>)}
                            </div>
                            <p className='font-normal hidden lg:block'>{ProductAbout}</p>
                        </div>
                    </div>
                </div>
                <p className='font-normal lg:hidden'>{ProductAbout}</p>
                <div className='meta-details-wrapper flex flex-row justify-between items-center relative'>
                    <p className='date italic text-slate-400 text-center'>{PostDate}</p>
                   {ProductUrl && (
                     <button className='hidden lg:block btn rounded-xl bg-primary-500 hover:bg-primary-600 px-6 py-2 w-auto text-white font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg' onClick={(event) => {
                        event.stopPropagation();
                        handleRedirect();
                    }}>BUY IT NOW</button>
                   )}
                </div>

               {ProductUrl && (
                 <button className='btn rounded-xl bg-primary-500 hover:bg-primary-600 px-6 py-3 w-full text-white font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg lg:hidden' onClick={(event) => {
                    event.stopPropagation();
                    handleRedirect();
                }}>BUY IT NOW</button>
               )
               }
            </div>
        </div>
    );
}
