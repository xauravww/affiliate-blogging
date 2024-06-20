import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import Navbar from './components/Navbar';
import SearchContextFunction from './context/SearchContext';
import NavbarContextFunction from './context/NavbarContext';
import InfoDisplay from './pages/InfoDisplay';
import { disclaimer, privacy, affiliate, contact, terms } from './data/data';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import NotFoundPage from './pages/NotFoundPage';
import Footer from './components/Footer';
import ContactUsPage from './pages/ContactUs';

import robotstxtfile from '../public/robots.txt'
import RelatedPosts from './components/RelatedPosts';
function App() {
  return (
    <div className='w-full h-screen bg-[#F2F2F2]'>
      <HelmetProvider>
      <Helmet>
        <title>Home Page</title>
        <meta name='description' content="Welcome to Rupay Savvy's Home page, your destination for exploring the latest posts on various topics. Discover insightful articles, detailed product reviews, and the latest updates in technology, lifestyle, and more, curated just for you. Stay informed and engaged with our top posts and use our convenient search feature to find exactly what you're looking for. Join our community and enjoy a seamless browsing experience with our user-friendly navigation and informative content. Visit Rupay Savvy now for your daily dose of fresh and relevant content." />
        </Helmet>
        <NavbarContextFunction>
          <SearchContextFunction>
            <Navbar />
            <Routes>
              <Route path='/:id' element={<PostDetail />} />
              {/* <Route path='/contact-us' element={<InfoDisplay textData={contact} title={"Contact Us"} />} /> */}
              <Route path='/contact-us' element={<ContactUsPage textData={contact} title={"Contact Us"} />} />
              <Route path='/affiliate-disclosure' element={<InfoDisplay textData={affiliate} title={"Affiliate Disclosure"} />} />
              <Route path='/privacy-policy' element={<InfoDisplay textData={privacy} title={"Privacy Policy"} />} />
              <Route path='/terms-and-conditions' element={<InfoDisplay textData={terms} title={"Terms & Conditions"} />} />
              <Route path='/disclaimer' element={<InfoDisplay textData={disclaimer} title={"Disclaimer"} />} />
              <Route path='/' element={<Home />} title={"Home Page"} />
              <Route path='/page-not-found' element={<NotFoundPage />} title={"404 Not Found"} />
              <Route path='/robots.txt' element={robotstxtfile} />
              {/* <Route path='/rel' element={RelatedPosts} /> */}
              <Route path='/*' element={<NotFoundPage />} title={"404 Not Found"} />
            </Routes>
           <Footer/>
          </SearchContextFunction>
        </NavbarContextFunction>
      </HelmetProvider>
    </div>
  );
}

export default App;
