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
import ErrorBoundary from './components/ErrorBoundary';
import SkipToContent from './components/SkipToContent';
function App() {
  return (
    <ErrorBoundary>
      <div className='min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100'>
        <HelmetProvider>
        <Helmet>
          <title>Rupay Savvy - Best Deals & Product Reviews</title>
          <meta name='description' content="Discover the best deals, product reviews, and money-saving tips at Rupay Savvy. Your trusted source for smart shopping decisions and affiliate recommendations." />
          <meta property="og:title" content="Rupay Savvy - Best Deals & Product Reviews" />
          <meta property="og:description" content="Discover the best deals, product reviews, and money-saving tips at Rupay Savvy." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://rupaysavvy.in" />
          <meta property="og:image" content="https://rupaysavvy.in/assets/rupay-savvy-transparent.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Rupay Savvy - Best Deals & Product Reviews" />
          <meta name="twitter:description" content="Discover the best deals, product reviews, and money-saving tips at Rupay Savvy." />
          <meta name="twitter:image" content="https://rupaysavvy.in/assets/rupay-savvy-transparent.png" />
          <link rel="canonical" href="https://rupaysavvy.in" />
        </Helmet>
        <NavbarContextFunction>
          <SearchContextFunction>
            <div className="flex flex-col min-h-screen">
              <SkipToContent />
              <Navbar />
              <main id="main-content" className="flex-grow" role="main">
                <Routes>
                  {/* Static Routes - Must come before dynamic routes */}
                  <Route path='/' element={<Home />} />
                  <Route path='/contact-us' element={<ContactUsPage textData={contact} title={"Contact Us"} />} />
                  <Route path='/affiliate-disclosure' element={<InfoDisplay textData={affiliate} title={"Affiliate Disclosure"} />} />
                  <Route path='/privacy-policy' element={<InfoDisplay textData={privacy} title={"Privacy Policy"} />} />
                  <Route path='/terms-and-conditions' element={<InfoDisplay textData={terms} title={"Terms & Conditions"} />} />
                  <Route path='/disclaimer' element={<InfoDisplay textData={disclaimer} title={"Disclaimer"} />} />
                  <Route path='/404' element={<NotFoundPage />} />

                  {/* Dynamic Routes - Must come after static routes */}
                  <Route path='/post/:id' element={<PostDetail />} />
                  <Route path='/:id' element={<PostDetail />} />

                  {/* Catch-all route for 404 */}
                  <Route path='*' element={<NotFoundPage />} />
                </Routes>
              </main>
              <Footer/>
            </div>
          </SearchContextFunction>
        </NavbarContextFunction>
      </HelmetProvider>
      </div>
    </ErrorBoundary>
  );
}

export default App;
