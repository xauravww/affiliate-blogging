export default function ShimmerPostDetailComp(){
    return (
      <>
      <div className="container min-w-[90vw] max-w-[90vw] px-5 lg:min-w-[50vw] lg:max-w-[50vw] mt-3 ">
        <div className="item-wrapper w-full flex flex-col gap-2 rounded-md px-5 py-2 bg-white animate-pulse">
          <div className="item flex justify-between gap-4">
            <div className="shimmer-image w-[20vw] h-[20vw] md:w-32 md:h-32 bg-gray-300 rounded-md"></div>
            <div className="title-price-wrapper-outer w-full flex items-center justify-center">
              <div className="title-price-wrapper-inner font-bold w-full">
                <div className="shimmer-title bg-gray-300 h-6 w-3/4 mb-2"></div>
                <div className="price-wrapper font-thin text-xl mt-2 flex text-center flex-row flex-wrap">
                  <div className="shimmer-price-new bg-gray-300 h-6 w-1/4 mr-2"></div>
                  <div className="shimmer-price-old bg-gray-300 h-6 w-1/4"></div>
                  <div className="shimmer-discount-rate bg-gray-300 h-6 w-1/4"></div>
                </div>
                <div className="shimmer-about bg-gray-300 h-4 w-full mt-2"></div>
              </div>
            </div>
          </div>
          <div className="meta-details-wrapper flex flex-row justify-between items-center relative">
            <div className="shimmer-date bg-gray-300 h-4 w-1/4"></div>
            <button className="shimmer-button bg-gray-300 h-8 rounded-md w-[80px] md:hidden"></button>
          </div>
        </div>
    
      </div>
          {/* Description */}
         
          <div className="flex mx-5 p-5 flex-col gap-2 mt-4 bg-white rounded-md animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
          <div className="flex mx-5 p-5 flex-col gap-2 mt-4 bg-white rounded-md animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
          <div className="flex mx-5 p-5 flex-col gap-2 mt-4 bg-white rounded-md animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
          <div className="flex mx-5 p-5 flex-col gap-2 mt-4 bg-white rounded-md animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
        </>
    );
  };
  