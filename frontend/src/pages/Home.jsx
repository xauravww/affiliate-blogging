import React, { useContext, useEffect, useState } from "react";
import HomeComp from "../components/HomeItem";
import axios from "axios";
import TopPosts from "../components/TopPosts";
import { Helmet } from "react-helmet-async";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShimmerHomeComp from "../components/ShimmerUIs/ShimmerHomeComp";
import { searchContext } from "../context/SearchContext";
import { scroller, Element , animateScroll as scroll } from "react-scroll"; // Import from react-scroll

function Home() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextCursor, setNextCursor] = useState(null);
  const [showShimmer, setShowShimmer] = useState(false); 
  const { searchQuery } = useContext(searchContext);

  const fetchData = async () => {
    scroll.scrollToTop()
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
      } else {
        response = await axios.get(`${BACKEND_URL}/posts`, {
          params: { startCursor: nextCursor },
        });

        setPosts((prevPosts) => [
          ...response.data.data,
        ]);
        setNextCursor(response.data.nextCursor);
      }
      
    //   scroll.scrollToTop()

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
    const delayTimer = setTimeout(() => {
      fetchData(); 
    }, 1000); 

    return () => clearTimeout(delayTimer); 
  }, [searchQuery]);

  const handleLoadMore = () => {
    if (nextCursor) {
      fetchData();
    }
  };

  const filteredPosts = posts.filter((post) => post.Status === "LIVE");

  return (
    <div className="main bg-[#F2F2F2] min-h-[90vh] lg:min-h-[57vh]">
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="Welcome to Rupay Savvy's Home page, your destination for exploring the latest posts on various topics."
        />
      </Helmet>

      <div className="for-padding-wrapper flex flex-col bg-[#F2F2F2] px-5 md:flex-row lg:w-full ">
        <div className="posts-map my-4 w-full flex flex-col md:flex-row">
          <div className="posts-list w-full md:w-3/4">
            {(!loading || !showShimmer) && filteredPosts.length === 0 && !loading && !showShimmer ? (
              <p>No posts available.</p>
            ) : (
              (!loading || !showShimmer) && filteredPosts.map((post, index) => (
                <Element key={post.id} name={index === filteredPosts.length - 1 ? 'latestPost' : ''}>
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
                </Element>
              ))
            )}

            {(loading || showShimmer) &&
              Array.from({ length: 10 }).map((_, index) => (
                <ShimmerHomeComp key={index} />
              ))}

            {nextCursor && !loading && (
              <button
                className="load-more-btn bg-[#FFA500] text-white font-bold py-2 px-4 rounded my-4"
                onClick={handleLoadMore}
              >
                Load More
              </button>
            )}
            {!nextCursor && !loading && (
              <>
                <p className="text-center text-gray-500">
                  No more posts available.
                </p>
                <button
                  className="load-more-btn bg-[#FFA500] text-white font-bold py-2 px-4 rounded my-4"
                  onClick={() => {
                    setPosts([]);
                    toast.success("All posts loaded successfully!");
                    fetchData();
                  }}
                >
                  Load All Posts
                </button>
              </>
            )}
          </div>
          <div className="top-posts w-full md:w-1/4"></div>
        </div>
        <TopPosts />
      </div>
      <ToastContainer />
    </div>
  );
}

export default Home;
