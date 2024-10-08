import React from 'react';
import TopPosts from '../components/TopPosts';
import { Helmet } from 'react-helmet-async';
import Footer from '../components/Footer';

function InfoDisplay({ textData, title }) {
  const formattedText = textData.split('\n').map((str, index) => (
    <React.Fragment key={index}>
      {str}
      <br />
    </React.Fragment>
  ));

  return (
   <div className='bg-[#F2F2F2]'>
       <div className='flex flex-col justify-between w-full mt-3 rounded-md bg-[#F2F2F2] lg:flex-row'>
        <Helmet>
          <title>{title}</title>
          <meta name='description' content={textData} />
        </Helmet>
        
        <div className='w-full p-5 lg:max-w-[60vw] min-w-[60vw]'>
          <div className='border border-red p-5 bg-white rounded-md'>
            <div className='text-block'>
              {formattedText}
            </div>
          </div>
        </div>
        <TopPosts />
      </div>
      {/* <Footer /> */}
   </div>
  );
}

export default InfoDisplay;
