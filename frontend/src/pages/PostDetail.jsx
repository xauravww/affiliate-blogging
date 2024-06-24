import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Loader from "../components/Loader/Loader";
import RelatedPosts from "../components/RelatedPosts";
import { navbarContext } from "../context/NavbarContext";
import TopPosts from "../components/TopPosts"
function PostDetail() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [post, setPost] = useState({});
  const [childrenData, setchildrenData] = useState([]);
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
        if (postResponse.request.responseURL.includes("/page-not-found")) {
          navigate("/page-not-found");
          return;
        }
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
        if (blocksResponse.request.responseURL.includes("/page-not-found")) {
          navigate("/page-not-found");
          return;
        }
        setchildrenData(blocksResponse.data.data);
      } catch (err) {
        console.log("Error fetching data:", err);
        navigate("/page-not-found");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate, BACKEND_URL, setnavOverlayVisibleItems]);

  useEffect(() => {
    console.log(childrenData);
  }, [childrenData]);

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
    <div className="bg-[#F2F2F2]">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <div className="bg-[#F2F2F2]">
          {showCustomBar && (ProductUrl || CurrentPrice || OldPrice) && (
            <div className="custom-bar-overlay fixed w-full bg-white shadow-md h-28 flex justify-end gap-10 items-center pr-8 top-0 z-10">
              <div className="custom-bar">
                <p>
                  {OldPrice && (
                    <span className="line-through">₹{OldPrice}</span>
                  )}
                  {CurrentPrice && (
                    <span className="font-bold mx-3">₹{CurrentPrice}</span>
                  )}
                  {ProductUrl && (
                    <button
                      className="inline-block btn rounded-md bg-[#ffa500] hover:bg-[#dbaf5d] px-6 py-1 w-auto text-white"
                      onClick={handleRedirect}
                    >
                      BUY IT NOW
                    </button>
                  )}
                </p>
              </div>
            </div>
          )}
          <div className="flex justify-around w-full flex-col mt-3 shadow-sm shadow-slate-400 rounded-md bg-[#F2F2F2] px-5 pb-5 lg:flex-row">
            <Helmet>
              <title>{ProductTitle}</title>
              <meta name="description" content={ProductAbout} />
            </Helmet>
            <div className="item-wrapper w-full flex flex-col gap-2 rounded-md p-5 bg-white lg:w-[60vw]">
              <div className="item flex justify-between gap-4">
                <img
                  src={imgUrl}
                  alt=""
                  className="w-[20vw] h-[20vw] md:w-32 md:h-32"
                />
                <div className="title-price-wrapper-outer w-full">
                  <div className="title-price-wrapper-inner font-bold">
                    <p>{ProductTitle}</p>
                    <div className="price-wrapper font-thin text-1xl mt-2 flex text-center flex-row flex-wrap">
                      {CurrentPrice && (
                        <div className="price-new text-[#ffa500] font-bold">
                          ₹{CurrentPrice}
                        </div>
                      )}
                      {OldPrice && (
                        <div className="price-old mx-2 line-through text-slate-400">
                          ₹{OldPrice}
                        </div>
                      )}
                      {DiscountRate !== "0%" && (
                        <div className="discount-rate bg-black text-white">
                          {DiscountRate}
                        </div>
                      )}
                    </div>
                    <p className="font-normal hidden lg:block">
                      {ProductAbout}
                    </p>
                  </div>
                </div>
              </div>
              <p className="font-normal lg:hidden">{ProductAbout}</p>
              <div className="meta-details-wrapper flex flex-row justify-between items-center relative">
                <p className="date italic text-slate-400 text-center">
                  {PostDate && !isNaN(new Date(PostDate).getTime())
                    ? new Date(PostDate).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : ""}
                </p>
                {isNavbarVisible && ProductUrl && (
                  <button
                    className="hidden lg:block btn rounded-md bg-[#ffa500] hover:bg-[#dbaf5d] px-6 py-1 w-auto text-white"
                    onClick={handleRedirect}
                  >
                    BUY IT NOW
                  </button>
                )}
              </div>
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

                return (
                  <p
                    key={index}
                    className={`text-xl`}
                    style={{
                      color: `${
                        color === "default" ? "black" : color || "black"
                      }`,
                    }}
                  >
                    {item.value}
                  </p>
                );
              })}
            </div>
            <TopPosts/>
          </div>
          <RelatedPosts category={category} />
          <Footer />
        </div>
      )}
    </div>
  );
}

export default PostDetail;
