import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { navbarContext } from "../context/NavbarContext";
import TopPosts from "../components/TopPosts";
import { Helmet } from "react-helmet-async";

import RelatedPosts from "../components/RelatedPosts";

import TopPostsShimmer from "../components/ShimmerUIs/ShimmerTopPostsComp";
import ShimmerPostDetailComp from "../components/ShimmerUIs/ShimmerPostDetailComp";


function PostDetail() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [post, setPost] = useState({});
  const [childrenData, setChildrenData] = useState([]);
  const [showCustomBar, setShowCustomBar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);
  const { id } = useParams();
  const { isNavbarVisible, setnavOverlayVisibleItems } =
    useContext(navbarContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isNavbarVisible ? "navbar is visible" : "navbar not visible");
    setShowCustomBar(!isNavbarVisible);
  }, [isNavbarVisible]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const postResponse = await axios.get(`${BACKEND_URL}/posts/${id}`);
        const postData = postResponse.data.data;
        setPost(postData);

        const categoryFromPost = postData?.Category || [];
        setCategory(categoryFromPost);

        setnavOverlayVisibleItems({
          productUrl: postData?.ProductUrl ? true : false,
          oldPrice: postData?.OldPrice ? true : false,
          newPrice: postData?.CurrentPrice ? true : false,
        });

        const blocksResponse = await axios.get(`${BACKEND_URL}/blocks/${id}`);
        setChildrenData(blocksResponse.data.data);
      } catch (err) {
        console.error("Error fetching post data:", err);
        // Check if it's a 404 error or network error
        if (err.response?.status === 404) {
          navigate("/404", { replace: true });
        } else {
          // For other errors, still redirect to 404 but log the error
          console.error("Unexpected error:", err);
          navigate("/404", { replace: true });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate, BACKEND_URL, setnavOverlayVisibleItems]);

  const {
    CurrentPrice,
    PostDate,
    OldPrice,
    ProductTitle,
    DiscountRate,
    ProductAbout,
    imgUrl,
    ProductUrl,
  } = post;

  const handleRedirect = () => {
    window.location.href = ProductUrl;
  };

  return (
    <div className="bg-gradient-to-br from-neutral-50 to-white min-h-screen">
      {loading ? (
        <div className="flex justify-center h-screen">
          <div>
          <ShimmerPostDetailComp/>
          </div>
          <div className="hidden px-8 lg:block">
            <h2 className="text-2xl my-6">Top Offers</h2>
            <TopPostsShimmer />
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-neutral-50 to-white min-h-screen">
          {showCustomBar && (ProductUrl || CurrentPrice || OldPrice) && (
            <div className="custom-bar-overlay fixed w-full bg-white/95 backdrop-blur-sm h-28 flex justify-end gap-10 items-center pr-8 top-0 z-10 border-b border-neutral-200 shadow-lg">
              <div className="custom-bar">
                <div className="flex items-center gap-4">
                  {OldPrice && (
                    <span className="line-through text-neutral-500 text-lg">₹{OldPrice}</span>
                  )}
                  {CurrentPrice && (
                    <span className="font-bold text-2xl text-primary-600">₹{CurrentPrice}</span>
                  )}
                  {ProductUrl && (
                    <button
                      className="btn rounded-xl bg-primary-500 hover:bg-primary-600 px-8 py-3 text-white font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                      onClick={handleRedirect}
                    >
                      BUY IT NOW
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="container mx-auto px-6 py-8 max-w-7xl">
            <div className="flex flex-col lg:flex-row gap-8">
            <Helmet>
              <title>{ProductTitle} - Rupay Savvy</title>
              <meta name="description" content={ProductAbout} />
              <meta property="og:title" content={`${ProductTitle} - Rupay Savvy`} />
              <meta property="og:description" content={ProductAbout} />
              <meta property="og:type" content="article" />
              <meta property="og:url" content={`https://rupaysavvy.in/${id}`} />
              <meta property="og:image" content={imgUrl} />
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:title" content={`${ProductTitle} - Rupay Savvy`} />
              <meta name="twitter:description" content={ProductAbout} />
              <meta name="twitter:image" content={imgUrl} />
              <link rel="canonical" href={`https://rupaysavvy.in/${id}`} />

              {/* Structured Data for Product */}
              <script type="application/ld+json">
                {JSON.stringify({
                  "@context": "https://schema.org/",
                  "@type": "Product",
                  "name": ProductTitle,
                  "description": ProductAbout,
                  "image": imgUrl,
                  "offers": {
                    "@type": "Offer",
                    "price": CurrentPrice,
                    "priceCurrency": "INR",
                    "availability": "https://schema.org/InStock",
                    "url": ProductUrl
                  },
                  "brand": {
                    "@type": "Brand",
                    "name": "Rupay Savvy"
                  }
                })}
              </script>
            </Helmet>
              {/* Main Product Section */}
              <div className="flex-1">
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-neutral-200">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3">
                      <img
                        src={imgUrl}
                        alt={`${ProductTitle} - Product Image`}
                        className="w-full h-64 md:h-80 rounded-xl object-cover shadow-lg"
                        loading="lazy"
                      />
                    </div>
                    <div className="md:w-2/3 space-y-6">
                      <div>
                        <h1 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4 leading-tight">
                          {ProductTitle}
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                          {CurrentPrice && (
                            <div className="text-3xl font-bold text-primary-600">
                              ₹{CurrentPrice}
                            </div>
                          )}
                          {OldPrice && (
                            <div className="text-xl line-through text-neutral-400">
                              ₹{OldPrice}
                            </div>
                          )}
                          {DiscountRate !== "0%" && (
                            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                              {DiscountRate} OFF
                            </div>
                          )}
                        </div>
                        <p className="text-lg text-neutral-600 leading-relaxed">
                          {ProductAbout}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Product Details Content */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-neutral-200">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-neutral-500">Published:</span>
                      <span className="text-sm font-medium text-neutral-700">
                        {PostDate && !isNaN(new Date(PostDate).getTime())
                          ? new Date(PostDate).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                          : ""}
                      </span>
                    </div>
                    {isNavbarVisible && ProductUrl && (
                      <button
                        className="btn rounded-xl bg-primary-500 hover:bg-primary-600 px-8 py-3 text-white font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                        onClick={handleRedirect}
                      >
                        BUY IT NOW
                      </button>
                    )}
                  </div>

                  <div className="prose prose-lg max-w-none">
              {childrenData.map((item, index) => {
                const color = item?.annotations?.color || "black";

                if (
                  item.type === "paragraph" &&
                  item?.value?.includes("&DATE")
                ) {
                  const formattedDate =
                    PostDate && !isNaN(new Date(PostDate).getTime())
                      ? new Date(PostDate).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : new Date().toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        });
                  item.value = item.value.replace(
                    "&DATE",
                    `<strong>${formattedDate}</strong>`
                  );
                }

                if (item.type === "heading_1") {
                  return (
                    <h1
                      className={`text-3xl`}
                      style={{
                        color: `${
                          color === "default" ? "black" : color || "black"
                        }`,
                      }}
                      key={index}
                    >
                      {item.value}
                    </h1>
                  );
                }

                if (item.href) {
                  return (
                    <li key={index}>
                      <a href={item.href} className="text-blue-800">
                        {item.value}
                      </a>
                    </li>
                  );
                }

                if (color === "green") {
                  return (
                    <span key={index} className="text-green-800">
                      {item.value}
                    </span>
                  );
                }

                if (color === "red") {
                  return (
                    <span key={index} className="text-red-800">
                      {item.value}
                    </span>
                  );
                }

                switch (item.type) {
                  case "heading_2":
                  case "heading_3":
                  case "heading_4":
                  case "heading_5":
                  case "heading_6":
                    return (
                      <h1
                        className={`text-2xl font-medium text-black`}
                        key={index}
                      >
                        {item.value}
                      </h1>
                    );
                  case "bulleted_list_item":
                    return <li key={index}>{item.value}</li>;
                  case "numbered_list_item":
                    return <li key={index}>{item.value}</li>;
                  case "paragraph":
                    const textWithLinksHighlighted = item?.value?.replace(
                      /(https?:\/\/[^\s]+)/g,
                      '<a href="$1" target="_blank" rel="noopener noreferrer" style="color:blue;">$1</a>'
                    );
                    return (
                      <p
                        key={index}
                        dangerouslySetInnerHTML={{
                          __html: textWithLinksHighlighted,
                        }}
                      />
                    );
                  default:
                    return null;
                }
                    })}
                    {ProductUrl && (
                      <div className="mt-8 lg:hidden">
                        <button
                          className="btn rounded-xl bg-primary-500 hover:bg-primary-600 px-8 py-4 w-full text-white font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                          onClick={handleRedirect}
                        >
                          BUY IT NOW
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:w-80">
                <TopPosts />
              </div>
            </div>

            {/* Tags Section */}
            {category.length > 0 && (
              <div className="container mx-auto px-6 py-8">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-neutral-200">
                  <h2 className="text-2xl font-display font-bold text-neutral-900 mb-6">Product Tags</h2>
                  <div className="flex flex-wrap gap-3">
                    {category.map((cat, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium hover:bg-primary-200 transition-colors duration-200"
                      >
                        #{cat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Related Products Section */}
            {category.length > 0 && (
              <div className="container mx-auto px-6 pb-8">
                <RelatedPosts category={category} excludeId={id} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default PostDetail;
