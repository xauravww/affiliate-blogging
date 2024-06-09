import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeComp from '../components/HomeItem';
import axios from 'axios';
import Pagination from '../components/Pagination';
import { searchContext } from '../context/SearchContext';
import TopPosts from '../components/TopPosts';
import { Helmet } from 'react-helmet-async';
import Footer from '../components/Footer';
import { Oval } from 'react-loader-spinner'; // Import the Oval loader

function Home() {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/posts`);
                setPosts(response.data.data);
            } catch (error) {
                console.log("Error fetching posts data:", error);
            } finally {
                setLoading(false); // Set loading to false once data is fetched
            }
        };
        fetchData();
    }, [BACKEND_URL]);

    const { searchQuery } = useContext(searchContext);
    const navigate = useNavigate();

    const filteredPosts = posts.filter((post) => {
        const searchFields = ['ProductTitle', 'ProductAbout', 'Name', 'PostDate'];
        const matchesSearchQuery = searchFields.some((field) =>
            post[field]?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return post.Status === 'LIVE' && matchesSearchQuery;
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(10);
    const lastPageIndex = currentPage * postPerPage;
    const firstPageIndex = lastPageIndex - postPerPage;
    const currentPost = filteredPosts.slice(firstPageIndex, lastPageIndex);

    return (
        <div className='main bg-[#F2F2F2] h-full'>
            <Helmet>
                <title>Home Page</title>
                <meta name='description' content="Welcome to Rupay Savvy's Home page, your destination for exploring the latest posts on various topics. Discover insightful articles, detailed product reviews, and the latest updates in technology, lifestyle, and more, curated just for you. Stay informed and engaged with our top posts and use our convenient search feature to find exactly what you're looking for. Join our community and enjoy a seamless browsing experience with our user-friendly navigation and informative content. Visit Rupay Savvy now for your daily dose of fresh and relevant content." />
            </Helmet>

            <div className='for-padding-wrapper bg-[#F2F2F2] px-5 lg:px-10 w-full'>
                <div className='wrHomeer-main-outer w-full bg-[#F2F2F2]'>
                    <div className='wrapper-flexing flex flex-col lg:flex-row'>
                        <div className='posts-map'>
                            <h2 className='text-2xl font-bold my-6'>Latest Posts</h2>
                            <div className='posts-map w-full flex flex-col items-center md:w-full'>
                                {loading ? (
                                    <Oval
                                        visible={true}
                                        height={80}
                                        width={80}
                                        color="#ffa500"
                                        ariaLabel="oval-loading"
                                        secondaryColor="#ffa500"
                                    />
                                ) : (
                                    currentPost.map((post) => (
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
                <Pagination totalPosts={filteredPosts.length} postPerPage={postPerPage} setcurrentPage={setCurrentPage} currentPage={currentPage} />
            </div>
            <Footer />
        </div>
    );
}

export default Home;
