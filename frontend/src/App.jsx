import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import Navbar from './components/Navbar';
import SearchContextFunction from './context/SearchContext';
import NavbarContextFunction from './context/NavbarContext';
import InfoDisplay from './pages/InfoDisplay';
import { disclaimer, privacy, affiliate, contact, terms } from './data/data';
import { HelmetProvider } from 'react-helmet-async';
import NotFoundPage from './pages/NotFoundPage';
import Footer from './components/Footer';
function App() {
  return (
    <div className='w-full h-screen bg-[#F2F2F2]'>
      <HelmetProvider>
        <NavbarContextFunction>
          <SearchContextFunction>
            <Navbar />
            <Routes>
              <Route path='/:id' element={<PostDetail />} />
              <Route path='/contact-us' element={<InfoDisplay textData={contact} title={"Contact Us"} />} />
              <Route path='/affiliate-disclosure' element={<InfoDisplay textData={affiliate} title={"Affiliate Disclosure"} />} />
              <Route path='/privacy-policy' element={<InfoDisplay textData={privacy} title={"Privacy Policy"} />} />
              <Route path='/terms-and-conditions' element={<InfoDisplay textData={terms} title={"Terms & Conditions"} />} />
              <Route path='/disclaimer' element={<InfoDisplay textData={disclaimer} title={"Disclaimer"} />} />
              <Route path='/' element={<Home />} title={"Home Page"} />
              <Route path='/page-not-found' element={<NotFoundPage />} title={"404 Not Found"} />
              <Route path='/*' element={<NotFoundPage />} title={"404 Not Found"} />
            </Routes>
           
          </SearchContextFunction>
        </NavbarContextFunction>
      </HelmetProvider>
    </div>
  );
}

export default App;
