import { useContext, useEffect, useState } from "react";
import HomeComp from "../components/HomeItem";
import axios from "axios";
import TopPosts from "../components/TopPosts";
import { Helmet } from "react-helmet-async";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShimmerHomeComp from "../components/ShimmerUIs/ShimmerHomeComp";
import { searchContext } from "../context/SearchContext";
import { Element , animateScroll as scroll } from "react-scroll";
import TrendingCategories from "../components/TrendingCategories";
import StatsCounter from "../components/StatsCounter";
import FeaturesShowcase from "../components/FeaturesShowcase";
import NewsletterSection from "../components/NewsletterSection";

import scrolltoTopIcon from "/assets/arrow-up.svg"
function Home() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [posts, setPosts] = useState([]);
  const [isHoverScrollToTopIcon, setIsHoverScrollToTopIcon] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nextCursor, setNextCursor] = useState(null);
  const [showShimmer, setShowShimmer] = useState(false); 
  const { searchQuery } = useContext(searchContext);

  const scrollToDealsSection = () => {
    setTimeout(() => {
      const dealsContainer = document.getElementById('live-deals-container');
      if (dealsContainer) {
        const containerTop = dealsContainer.offsetTop;
        window.scrollTo({
          top: containerTop - 120, // Offset for navbar/header
          behavior: 'smooth'
        });
      } else {
        // Fallback to deals section
        const dealsSection = document.querySelector('[name="deals-section"]');
        if (dealsSection) {
          dealsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    }, 800);
  };

  const fetchData = async () => {
    const isSearching = !!searchQuery;

    if (!isSearching) {
      scroll.scrollToTop();
    }

    setLoading(true);
    setShowShimmer(true);

    try {
      let response;

      if (searchQuery) {
        response = await axios.get(`${BACKEND_URL}/search`, {
          params: { query: searchQuery },
        });
        setPosts(response.data.data);
        setNextCursor(response.data.nextCursor);

        // Scroll to deals section for search results
        scrollToDealsSection();
      } else {
        response = await axios.get(`${BACKEND_URL}/posts`, {
          params: { startCursor: nextCursor },
        });

        setPosts(() => [
          ...response.data.data,
        ]);
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

  useEffect(() => {
    setShowShimmer(true);

    // Debounce search queries to avoid excessive API calls
    const delayTimer = setTimeout(() => {
      fetchData();
    }, searchQuery ? 500 : 100); // Shorter delay for initial load, longer for search

    return () => clearTimeout(delayTimer);
  }, [searchQuery]);

  const scrollToNewContent = (postIndex, delay = 800) => {
    setTimeout(() => {
      const dealsContainer = document.getElementById('live-deals-container');
      if (dealsContainer) {
        // Get all post elements within the container
        const postElements = dealsContainer.querySelectorAll('[data-post-index]');
        const targetPost = postElements[postIndex];

        if (targetPost) {
          // Scroll to the target post with offset for better visibility
          const elementTop = targetPost.offsetTop + dealsContainer.offsetTop;
          const offset = 120; // Adjust this value as needed for navbar/header space
          window.scrollTo({
            top: elementTop - offset,
            behavior: 'smooth'
          });
        } else {
          // Fallback: scroll to the deals container if specific post not found
          const containerTop = dealsContainer.offsetTop;
          window.scrollTo({
            top: containerTop - 100,
            behavior: 'smooth'
          });
        }
      }
    }, delay);
  };

  const handleLoadMore = async () => {
    if (nextCursor) {
      const currentPostCount = filteredPosts.length;

      // Fetch new data
      await fetchData();

      // Scroll to the first new post after data is loaded
      setTimeout(() => {
        // Scroll to the first new post using its index
        if (filteredPosts.length > currentPostCount) {
          scrollToNewContent(currentPostCount, 200);
        }
      }, 800); // Wait for posts to render and DOM to update
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
        <meta property="og:title" content="Rupay Savvy - Best Deals & Product Reviews" />
        <meta property="og:description" content="Discover the best deals, product reviews, and money-saving tips at Rupay Savvy." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rupaysavvy.in" />
        <link rel="canonical" href="https://rupaysavvy.in" />

        {/* Structured Data for Website */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Rupay Savvy",
            "description": "Discover the best deals, product reviews, and money-saving tips at Rupay Savvy. Your trusted source for smart shopping decisions.",
            "url": "https://rupaysavvy.in",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://rupaysavvy.in/?search={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>

        {/* Organization Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Rupay Savvy",
            "description": "Your trusted source for the best deals, honest product reviews, and smart shopping decisions.",
            "url": "https://rupaysavvy.in",
            "logo": "https://rupaysavvy.in/assets/rupay-savvy-transparent.png",
            "sameAs": [
              "https://www.facebook.com/people/Rupay-savvy/61561300434815/",
              "https://www.instagram.com/rupaysavvy",
              "https://www.linkedin.com/in/rupay-savvy",
              "https://in.pinterest.com/rupaysavvy"
            ]
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20 relative overflow-hidden">
        {/* Background decorations */}
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

          {/* CTA Buttons */}
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

          {/* Quick Stats */}
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

      {/* Trending Categories */}
      <Element name="categories-section">
        <TrendingCategories />
      </Element>

      {/* Stats Counter */}
      <StatsCounter />

      {/* Latest Deals Section */}
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
              {(!loading || !showShimmer) && filteredPosts.length === 0 && !loading && !showShimmer ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-semibold text-neutral-700 mb-2">No posts found</h3>
                  <p className="text-neutral-500">Try adjusting your search or check back later for new content.</p>
                </div>
              ) : (
                (!loading || !showShimmer) && filteredPosts.map((post, index) => (
                  <Element key={post.id} name={index === filteredPosts.length - 1 ? 'latestPost' : ''}>
                    <div className="animate-fade-in" data-post-index={index}>
                      <HomeComp
                        key={post.id}
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
                        searchQuery={searchQuery}
                        ProductUrl={post.ProductUrl}
                      />
                    </div>
                  </Element>
                ))
              )}

              {(loading || showShimmer) &&
                <div className="space-y-6">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <ShimmerHomeComp key={index} />
                  ))}
                </div>
              }

              {/* Load More Section */}
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
                  <>
                    <p className="text-center text-neutral-500 mb-4">
                      You&apos;ve reached the end! 🎉
                    </p>
                    <button
                      onClick={() => {
                        setPosts([]);
                        toast.success("Refreshing all posts!");
                        fetchData();
                      }}
                      className="bg-secondary-500 hover:bg-secondary-600 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-medium hover:shadow-large"
                    >
                      Refresh All Posts
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

            {/* Sidebar */}
            <div className="lg:w-80">
              <TopPosts />
            </div>
          </div>
        </div>
        </div>
      </Element>

      {/* Features Showcase */}
      <FeaturesShowcase />

      {/* Newsletter Section */}
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
