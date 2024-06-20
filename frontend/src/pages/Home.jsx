import React, { useContext, useEffect, useState } from 'react';
import HomeComp from '../components/HomeItem';
import axios from 'axios';
import Pagination from '../components/Pagination';
import { searchContext } from '../context/SearchContext';
import TopPosts from '../components/TopPosts';
import { Helmet } from 'react-helmet-async';
import Footer from '../components/Footer';
import 'ldrs/bouncy';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import debounce from 'debounce';

function Home() {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { searchQuery, setSearchQuery } = useContext(searchContext);
    const [startCursor, setStartCursor] = useState("");
    const [totalPosts, setTotalPosts] = useState(0);
    const [showSearchMessage, setShowSearchMessage] = useState(false); // State to control when to show search message

    // Function to fetch data from backend
    const fetchData = async () => {
        setLoading(true);
        try {
            let endpoint = searchQuery ? `${BACKEND_URL}/search` : `${BACKEND_URL}/posts`;

            if (startCursor) {
                endpoint += `?startCursor=${startCursor}`;
            }

            const response = await axios.get(endpoint, {
                params: { query: searchQuery, page: currentPage }
            });

            setPosts(response.data.data);
            setTotalPages(response.data.totalPages);
            setTotalPosts(response.data.totalPosts);
            setStartCursor(response.data.nextCursor);
            setShowSearchMessage(true); // Show search message after data is fetched successfully

        } catch (error) {
            setSearchQuery("");
            console.log(error);
            toast.error("Please wait a few seconds between searches...");
        } finally {
            setLoading(false);
        }
    };

    // Debounced version of fetchData with a delay of 2000 milliseconds (2 seconds)
    const debouncedFetchData = debounce(fetchData, 500);

    useEffect(() => {
        // Execute debouncedFetchData when searchQuery or currentPage changes
        debouncedFetchData();

        // Cleanup function to cancel debouncedFetchData on component unmount or when searchQuery changes
        return () => {
            debouncedFetchData.clear(); // Clear the debounced function on cleanup
        };
    }, [currentPage, searchQuery]); // Adjust dependencies as per your specific needs

    const handleSearch = (e) => {
        e.preventDefault();
        const query = e.target.search.value;
        setSearchQuery(query);
        setCurrentPage(1);
        setStartCursor("");
        setPosts([]);
        setTotalPosts(0);
        setShowSearchMessage(false); // Hide search message when starting new search
    };

    // Filter posts that are LIVE
    const filteredPosts = posts.filter((post) => post.Status === 'LIVE');

    useEffect(() => {
        setLoading(true)
        setStartCursor(null);
        setCurrentPage(1);
    }, [searchQuery]);

    return (
        <div className='main bg-[#F2F2F2] min-h-[90vh] lg:min-h-[57vh]'>
            <Helmet>
                <title>Home Page</title>
                <meta name='description' content="Welcome to Rupay Savvy's Home page, your destination for exploring the latest posts on various topics. Discover insightful articles, detailed product reviews, and the latest updates in technology, lifestyle, and more, curated just for you. Stay informed and engaged with our top posts and use our convenient search feature to find exactly what you're looking for. Join our community and enjoy a seamless browsing experience with our user-friendly navigation and informative content. Visit Rupay Savvy now for your daily dose of fresh and relevant content." />
            </Helmet>

            <div className='for-padding-wrapper bg-[#F2F2F2] px-5 lg:px-10 w-full'>
                <div className='wrapper-main-outer w-full bg-[#F2F2F2]'>
                    <div className='wrapper-flexing flex flex-col justify-between lg:flex-row'>
                        <div className='posts-map'>
                            <h2 className='text-2xl font-bold my-6 text-wrap'>
                                {searchQuery && showSearchMessage ? (
                                    !loading ? (
                                        totalPosts >= 0 ?
                                            `${totalPosts > 0 ? `${totalPosts} items found for "${searchQuery}"` : `No items found for "${searchQuery}"`}`
                                            : `No items found for "${searchQuery}"`
                                    ) : (
                                        `Searching for "${searchQuery}" ...`
                                    )
                                ) : (
                                    'Latest Posts'
                                ).slice(0, 100)} {/* Slice the string to 100 characters */}
                            </h2>


                            <div className='posts-map w-full flex flex-col items-center md:w-full'>
                                {loading ? (
                                    <l-bouncy></l-bouncy>
                                ) : (
                                    filteredPosts.map((post) => (
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
                                    ))
                                )}
                            </div>
                        </div>
                        <div>
                            <div className='w-full'>
                                <TopPosts />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='pagination-wrapper py-5 bg-[#F2F2F2]'>
                {!loading && (
                    <Pagination
                        totalPosts={totalPosts}
                        postPerPage={10}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        setLoading={setLoading}
                    />
                )}
            </div>
            {/* <Footer /> */}
            <ToastContainer />
        </div>
    );
}

export default Home;
