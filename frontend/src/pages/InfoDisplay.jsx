import React from 'react'
import TopPosts from '../components/TopPosts'
import { Helmet } from 'react-helmet-async'
function InfoDisplay({ textData,title }) {
  console.log(textData)
  return (
    <div className='flex flex-col justify-between w-full mt-3 rounded-md bg-[#F2F2F2] lg:flex-row'>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={textData} />
      </Helmet>
      <div className='w-full p-5'>
        {textData}
      </div>
      <TopPosts />
    </div>
  )
}

export default InfoDisplay
