import { useContext, useEffect, useState, useRef } from "react";
import HomeComp from "../components/HomeItem";
import axios from "axios";
import TopPosts from "../components/TopPosts";
import { Helmet } from "react-helmet-async";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShimmerHomeComp from "../components/ShimmerUIs/ShimmerHomeComp";
import { searchContext } from "../context/SearchContext";
import { Element, animateScroll as scroll } from "react-scroll";
import TrendingCategories from "../components/TrendingCategories";
import StatsCounter from "../components/StatsCounter";
import FeaturesShowcase from "../components/FeaturesShowcase";
import NewsletterSection from "../components/NewsletterSection";

import scrolltoTopIcon from "/assets/arrow-up.svg";

function Home() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [posts, setPosts] = useState([]);
  const [isHoverScrollToTopIcon, setIsHoverScrollToTopIcon] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nextCursor, setNextCursor] = useState(null);
  const [showShimmer, setShowShimmer] = useState(false);
  const { searchQuery } = useContext(searchContext);

  const isLoadMoreAction = useRef(false);
  const prevPostCount = useRef(0);

  // --- MODIFIED: fetchData now uses the raw searchQuery for searching ---
  const fetchData = async (cursor = null, isLoadMore = false) => {
    // Search logic now relies on the raw searchQuery from the context
    const isSearching = !!searchQuery && !isLoadMore;

    setLoading(true);
    setShowShimmer(true);

    try {
      let response;

      if (isSearching) {
        response = await axios.get(`${BACKEND_URL}/search`, {
          params: { query: searchQuery },
        });
        setPosts(response.data.data);
        setNextCursor(response.data.nextCursor);
      } else {
        response = await axios.get(`${BACKEND_URL}/posts`, {
          params: { startCursor: cursor },
        });

        if (isLoadMore) {
          setPosts((prevPosts) => [...prevPosts, ...response.data.data]);
        } else {
          setPosts(response.data.data);
        }
        setNextCursor(response.data.nextCursor);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
      toast.error("Error fetching data...");
    } finally {
      setLoading(false);
      setShowShimmer(false);
    }
  };

  // --- REFACTORED: This single useEffect now handles debouncing the API call ---
  // It listens for changes in the raw `searchQuery` and waits 500ms after
  // the user stops typing before calling `fetchData`.
  useEffect(() => {
    const handler = setTimeout(() => {
      // For a new search, we don't load more, so isLoadMore is false.
      fetchData(null, false);
    }, 500); // 500ms delay

    // Cleanup function to cancel the timer if the user types again
    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]); // The dependency is the raw search query from the input


  // This effect handles the smooth scrolling after data is loaded
  useEffect(() => {
    if (isLoadMoreAction.current) {
      const dealsContainer = document.getElementById('live-deals-container');
      if (dealsContainer) {
        const postElements = dealsContainer.querySelectorAll('[data-post-index]');
        const firstNewPost = postElements[prevPostCount.current];
        if (firstNewPost) {
          setTimeout(() => {
            const elementTop = firstNewPost.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
              top: elementTop - 100,
              behavior: 'smooth',
            });
          }, 100);
        }
      }
      isLoadMoreAction.current = false;
    }

    const isSearching = !!searchQuery;
    if (isSearching) {
        const dealsContainer = document.getElementById('live-deals-container');
        if (dealsContainer) {
            // This timeout ensures the scroll happens after the search results are rendered
            setTimeout(() => {
                const containerTop = dealsContainer.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({
                    top: containerTop - 100,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
  }, [posts, searchQuery]); // depends on posts and the raw query

  const handleLoadMore = () => {
    if (nextCursor && !loading) {
      prevPostCount.current = posts.filter(p => p.Status === "LIVE").length;
      isLoadMoreAction.current = true;
      fetchData(nextCursor, true);
    }
  };
  
  const filteredPosts = posts.filter((post) => post.Status === "LIVE");

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <Helmet>
        <title>Rupay Savvy - Best Deals & Product Reviews</title>
        <meta
          name="description"
          content="Discover the best deals, product reviews, and money-saving tips at Rupay Savvy. Your trusted source for smart shopping decisions."
        />
        {/* ... other meta tags ... */}
      </Helmet>

      {/* ... Hero Section and other components (no changes here) ... */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-48 -translate-y-48" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-32 translate-y-32" />
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 animate-fade-in">
            Find the Best Deals & Save Money
          </h1>
          <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto animate-slide-up">
            Discover amazing products, read honest reviews, and get exclusive deals curated just for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={() => scroll.scrollTo('deals-section', { smooth: true, offset: -100 })}
              className="bg-white text-primary-600 font-bold py-4 px-8 rounded-xl hover:bg-primary-50 transition-all duration-200 transform hover:scale-105 shadow-large"
            >
              Browse Latest Deals
            </button>
            <button
              onClick={() => scroll.scrollTo('categories-section', { smooth: true, offset: -100 })}
              className="border-2 border-white text-white font-bold py-4 px-8 rounded-xl hover:bg-white hover:text-primary-600 transition-all duration-200 transform hover:scale-105"
            >
              Explore Categories
            </button>
          </div>
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">1250+</div>
              <div className="text-primary-200 text-sm">Active Deals</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">15K+</div>
              <div className="text-primary-200 text-sm">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">₹25L+</div>
              <div className="text-primary-200 text-sm">Money Saved</div>
            </div>
          </div>
        </div>
      </div>
      <Element name="categories-section">
        <TrendingCategories />
      </Element>
      <StatsCounter />
      <Element name="deals-section">
        <div className="bg-gradient-to-br from-neutral-50 to-white py-20">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="flex-1">
                <div className="mb-12 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                    <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
                    Live Deals
                  </div>
                  <h2 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-6 leading-tight">
                    Latest Deals &
                    <span className="text-primary-600"> Reviews</span>
                  </h2>
                  <p className="text-xl text-neutral-600 max-w-2xl leading-relaxed">
                    Discover handpicked deals and in-depth reviews from our expert team.
                    <span className="text-primary-600 font-medium"> Save more, shop smarter.</span>
                  </p>
                </div>
                <div id="live-deals-container" className="space-y-6">
                  {showShimmer ? (
                    Array.from({ length: 6 }).map((_, index) => (
                      <ShimmerHomeComp key={index} />
                    ))
                  ) : filteredPosts.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="text-6xl mb-4">🔍</div>
                      <h3 className="text-2xl font-semibold text-neutral-700 mb-2">No posts found</h3>
                      <p className="text-neutral-500">Try adjusting your search or check back later for new content.</p>
                    </div>
                  ) : (
                    filteredPosts.map((post, index) => (
                      <div className="animate-fade-in" data-post-index={index} key={post.id}>
                        <HomeComp
                          CurrentPrice={post.CurrentPrice}
                          DiscountRate={post.DiscountRate}
                          Name={post.Name}
                          OldPrice={post.OldPrice}
                          PostDate={post.PostDate}
                          ProductAbout={post.ProductAbout}
                          ProductTitle={post.ProductTitle}
                          blockId={post.blockId}
                          id={post.id}
                          imgUrl={post.imgUrl}
                          ProductUrl={post.ProductUrl}
                        />
                      </div>
                    ))
                  )}

                  <div className="flex flex-col items-center gap-4 py-8">
                    {nextCursor && !loading && (
                      <button
                        onClick={handleLoadMore}
                        className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-medium hover:shadow-large"
                      >
                        Load More Deals
                      </button>
                    )}
                    {!nextCursor && !loading && filteredPosts.length > 0 && (
                      <p className="text-center text-neutral-500">
                        You&apos;re all caught up! You&apos;ve reached the end! 🎉
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="lg:w-80">
                <TopPosts />
              </div>
            </div>
          </div>
        </div>
      </Element>
      <FeaturesShowcase />
      <NewsletterSection />
      <button
        aria-label="Scroll to top"
        onClick={() => scroll.scrollToTop()}
        onMouseEnter={() => setIsHoverScrollToTopIcon(true)}
        onMouseLeave={() => setIsHoverScrollToTopIcon(false)}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-xl transition-all duration-300 ease-in-out ${
          isHoverScrollToTopIcon ? "scale-110 shadow-2xl" : "scale-100"
        } flex items-center justify-center border-2 border-white/20`}
      >
        <img
          src={scrolltoTopIcon}
          className="h-6 w-6 rotate-180"
          alt=""
        />
      </button>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Home;
