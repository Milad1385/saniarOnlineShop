import "swiper/css";
import "swiper/css/thumbs";
import React, { useEffect, useState } from "react";
import Topbar from "../../Components/Topbar/Topbar";
import Navbar from "../../Components/Navbar/Navbar";
import BreadCrumb from "../../Components/BreadCrumb/BreadCrumb";
import Footer from "../../Components/Footer/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Zoom } from "swiper/modules";
import SameProduct from "../../Components/SameProduct/SameProduct";
import FooterMenu from "../../Components/FooterMenu/FooterMenu";
import Shoper from "../../Components/Shoper/Shoper";
import Comments from "../../Components/Comments/Comments";
import FeatureList from "../../Components/FeatureList/FeatureList";
import ProductBoxInfo from "../../Components/ProductBoxInfo/ProductBoxInfo";
import ColorBox from "../../Components/ColorBox/ColorBox";
import SliderIcon from "../../Components/SliderIcon/SliderIcon";
import { Link, useParams } from "react-router-dom";
import useGetOne from "../../Hooks/AdminPanel/Product/useGetOne";
import DOMPurify from "dompurify";
import useCreate from "../../Hooks/wishlist/useCreate";
import useExist from "../../Hooks/wishlist/useExist";
import useDelete from "../../Hooks/wishlist/useDelete";
import useAdd from "../../Hooks/basket/useCreate";
import useMain from "../../Hooks/basket/useMain";
import useInc from "../../Hooks/basket/useInc";
import useDec from "../../Hooks/basket/useDec";
import useDeleteBasket from "../../Hooks/basket/useDelete";
import { isLogin } from "../../Utils/Funcs/utils";

function ProductPage() {
  const [optionShowModel, setOptionShowModel] = useState("توضیحات کالا");
  const [productCount, setProductCount] = useState(1);
  const [colorChoose, setColorChoose] = useState("");
  const [activeTumb, setActiveTumb] = useState(null);
  const [colorCode, setColorCode] = useState("");

  const { productName } = useParams();
  const { data: productInfo } = useGetOne(productName);
  const { mutateAsync: addToWishList } = useCreate();
  const { mutateAsync: deleteWish } = useDelete();
  const { mutateAsync: addToBasket } = useAdd();
  const { mutateAsync: increaseBasket } = useInc();
  const { mutateAsync: decreaseBasket } = useDec();
  const { mutateAsync: deleteBasket } = useDeleteBasket();
  const { data: basketInfo } = useMain(productInfo?.productInfo._id);
  const { data: isExist } = useExist(productInfo?.productInfo._id);

  useEffect(() => {
    window.scroll(0, 0);
    setActiveTumb(null);
    setProductCount(basketInfo?.[0]?.qty ?? 1);
  }, [productName, basketInfo]);

  const addToWishListHandler = async () => {
    await addToWishList(productInfo?.productInfo._id);
  };

  const removeWishList = async () => {
    await deleteWish(productInfo?.productInfo._id);
  };

  // basket functions
  const addToBasketHandler = async () => {
    const { _id, price, off } = productInfo?.productInfo;
    const productObj = {
      product: _id,
      qty: productCount || 1,
      colorName: colorChoose || "black",
      colorCode: colorCode || "#000",
      price: off ? price - (price * off) / 100 : price,
    };

    await addToBasket(productObj);
  };

  const increaseHandler = async () => {
    await increaseBasket(productInfo?.productInfo._id);
  };

  const decreaseHandler = async () => {
    await decreaseBasket(productInfo?.productInfo._id);
  };

  console.log(isLogin());

  return (
    <div>
      <Topbar />
      <Navbar />
      <div className="container">
        <BreadCrumb
          links={[
            { id: 1, name: "خانه", to: "/" },
            { id: 2, name: "فروشگاه", to: "/" },
            {
              id: 3,
              name: `${productInfo?.productInfo.category.title}`,
              to: `/category-products/${productInfo?.productInfo.category.link}`,
            },
            { id: 4, name: `${productInfo?.productInfo.title}`, to: "" },
          ]}
        />
        <div className="pb-5">
          <div className="grid  grid-cols-1 lg:grid-cols-3 bg-white shadow-md rounded-md px-3 py-4">
            <div className="">
              <div className="flex gap-x-3 border border-gray-200 px-3 py-4 rounded-md">
                <div className="flex flex-col gap-y-2">
                  <SliderIcon icon={"share"} />
                  {isLogin() === true && (
                    <div>
                      {isExist ? (
                        <div onClick={removeWishList}>
                          <SliderIcon className="text-red-600" icon={"heart"} />
                        </div>
                      ) : (
                        <div onClick={addToWishListHandler}>
                          <SliderIcon icon={"heart"} />
                        </div>
                      )}
                    </div>
                  )}
                  <SliderIcon icon={"right-left-arrow"} />
                  <SliderIcon icon={"chart-bar"} />
                </div>
                <Swiper
                  className="mySwiper"
                  thumbs={{ swiper: activeTumb }}
                  zoom={true}
                  modules={[Thumbs, Zoom]}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  spaceBetween={12}
                  slidesPerView={1}
                  breakpoints={{
                    0: {
                      slidesPerView: 1,
                    },
                  }}
                >
                  {productInfo?.productInfo.images.map((slider) => (
                    <SwiperSlide>
                      <img
                        src={`http://localhost:3001/uploads/covers/${slider}`}
                        className="w-[230px] h-[230px] lg:w-[333px] lg:h-[333px] md:mx-auto"
                        alt={slider}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="mt-4">
                <Swiper
                  onSwiper={setActiveTumb}
                  className="mySwiper"
                  modules={[Thumbs]}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  spaceBetween={12}
                  slidesPerView={2}
                  breakpoints={{
                    0: {
                      slidesPerView: 3,
                    },
                    640: {
                      slidesPerView: 3,
                    },
                    991: {
                      slidesPerView: 4,
                    },
                  }}
                >
                  {productInfo?.productInfo.images.map((slider) => (
                    <SwiperSlide>
                      {" "}
                      <div className="border border-gray-200 w-[95px] mx-auto md:mx-0 md:w-[107px] py-[6px] rounded-md">
                        <img
                          src={`http://localhost:3001/uploads/covers/${slider}`}
                          className="w-[68px] mx-auto slide-image transition-all"
                          alt={slider}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
            <div className="col-span-2 pr-4">
              <div className="flex items-center justify-between border-b-2 border-gray-200 pb-[10px] flex-wrap pt-5 md:pt-0">
                <div className="flex flex-col gap-y-3">
                  <h3 className="font-DanaDemiBold text-base md:text-lg">
                    {productInfo?.productInfo.longDesc}
                  </h3>
                  <span className="text-gray-500 text-sm font-DanaMedium">
                    {productInfo?.productInfo.shortDesc}
                  </span>
                </div>
                <img
                  src="/images/category/brand1-1.png"
                  className="w-[100px]"
                  alt="category"
                />
              </div>
              <div className="pt-5 flex justify-between flex-wrap gap-y-5">
                <div>
                  <h3 className="font-DanaDemiBold text-lg">ویژگی های کالا</h3>
                  <ul className="space-y-3 text-sm mt-3 font-DanaMedium">
                    {productInfo?.features.slice(0, 4).map((feature) => (
                      <li className="flex items-center gap-x-1">
                        <span className="text-gray-500">
                          {feature.featureName} :{" "}
                        </span>
                        <span>{feature.featureValue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-y-2 md:items-end">
                  <div className="flex items-center gap-x-2">
                    <span className="text-zinc-700 text-sm md:text-base">
                      16 دیدگاه
                    </span>
                    <span className="block w-[1.5px] h-5 bg-gray-200"></span>
                    <div className="flex gap-x-1">
                      <span className="text-sm md:text-base text-zinc-700">
                        (17) {productInfo?.productInfo.score}
                      </span>
                      <svg className="w-5 h-5 text-yellow-400">
                        <use href="#star"></use>
                      </svg>
                    </div>
                  </div>
                  <div className="flex  gap-x-2 mt-2">
                    <svg className="w-5 h-5 text-green-500">
                      <use href="#check"></use>
                    </svg>
                    <p className="font-DanaMedium text-sm md:text-base text-zinc-600">
                      گارانتی اصالت و سلامت فیزیکی کالا
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-5 space-y-4">
                <h3 className="font-DanaDemiBold text-base md:text-lg">
                  انتخاب رنگ : {colorChoose || "انتخاب کنید"}{" "}
                </h3>
                <div className="flex items-center flex-wrap gap-2 mt-2">
                  {productInfo?.colors.map((color) => (
                    <ColorBox
                      colorCode={color.colorCode}
                      colorName={color.colorName}
                      colorChoose={colorChoose}
                      setColorChoose={setColorChoose}
                      setCode={setColorCode}
                    />
                  ))}
                </div>
              </div>
              <p className="my-3 text-sm font-DanaDemiBold text-blue-600">
                {productInfo?.productInfo.count} عدد در انبار
              </p>
              <div className="px-2.5 py-4 bg-gray-100 rounded-md shadow flex flex-col md:flex-row items-center gap-y-5 justify-between">
                <div>
                  <div className="flex items-center gap-x-4">
                    {productInfo?.productInfo.off !== 0 && (
                      <>
                        <span className="text-gray-400 font-DanaDemiBold line-through text-sm md:text-base">
                          {productInfo?.productInfo.price.toLocaleString("fa")}{" "}
                          تومان
                        </span>
                        <span className="block w-[1.5px] h-6 bg-gray-400"></span>
                      </>
                    )}
                    {productInfo?.productInfo.off ? (
                      <span className="text-blue-600 font-DanaDemiBold text-sm md:text-base">
                        {(
                          productInfo?.productInfo.price -
                          (productInfo?.productInfo.price *
                            productInfo?.productInfo.off) /
                            100
                        ).toLocaleString("fa")}{" "}
                        تومان
                      </span>
                    ) : (
                      <span className="text-blue-600 font-DanaDemiBold text-sm md:text-base">
                        {productInfo?.productInfo.price.toLocaleString("fa")}{" "}
                        تومان
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between gap-x-5">
                  {isLogin() === true ? (
                    <div>
                      {!basketInfo?.length && (
                        <button
                          onClick={addToBasketHandler}
                          className="flex items-center text-sm md:text-base gap-x-1 bg-blue-600 text-white px-6 py-2 rounded-md shadow-blue"
                        >
                          <svg className="w-6 h-6">
                            <use href="#shop-bag"></use>
                          </svg>
                          خرید <span className="">کالا</span>
                        </button>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={"/login"}
                      onClick={addToBasketHandler}
                      className="flex items-center text-sm md:text-base gap-x-1 bg-blue-600 text-white px-6 py-2 rounded-md shadow-blue"
                    >
                      <svg className="w-6 h-6">
                        <use href="#arrow-left-on-rectangle"></use>
                      </svg>
                      وارد شوید
                    </Link>
                  )}
                  {basketInfo?.length > 0 && (
                    <div className="flex items-center gap-x-2">
                      <div
                        onClick={() => increaseHandler()}
                        className="w-10 h-[30px] bg-blue-600 text-white flex-center rounded-r-full font-DanaMedium shadow-blue cursor-default md:cursor-pointer"
                      >
                        <span className="mt-1">+</span>
                      </div>
                      <div className="bg-white w-[50px] h-[30px] flex-center font-DanaDemiBold rounded-md shadow">
                        {productCount}
                      </div>
                      {basketInfo?.length && basketInfo?.[0]?.qty > 1 ? (
                        <div
                          onClick={decreaseHandler}
                          className="w-10 h-[30px] bg-blue-600 text-white flex-center rounded-l-full font-DanaMedium shadow-blue cursor-default md:cursor-pointer"
                        >
                          <span className="mt-1">-</span>
                        </div>
                      ) : (
                        <div
                          onClick={async () =>
                            await deleteBasket(productInfo?.productInfo._id)
                          }
                          className="w-10 h-[30px] bg-blue-600 text-white flex-center rounded-l-full font-DanaMedium shadow-blue cursor-default md:cursor-pointer"
                        >
                          <span className="mt-1">
                            <svg className="w-5 h-5 mb-1">
                              <use href="#trash"></use>
                            </svg>
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* other shop */}
        <div className="py-5 px-3 bg-white text-lg  shadow rounded-md">
          <div className="overflow-x-auto table-container">
            <h3 className="font-DanaDemiBold text-base md:text-lg">
              سایر فروشندگان موجود
            </h3>
            <div className="h-0.5 bg-gray-200 my-2 relative">
              <div className="absolute inset-0 bg-blue-600 w-1/12"></div>
            </div>
            <table className="w-full text-[16px] mt-5 divide-y-[1.5px] divide-gray-300">
              <Shoper />
              <Shoper />
              <Shoper />
              <Shoper />
            </table>
          </div>
        </div>
        {/* about product */}
        <div className="flex  mt-5">
          <div className="bg-white rounded-md shadow md:ml-5   w-full py-5 px-4">
            <div className="flex items-center gap-x-6 border-b-[1.5px] child:pb-4 border-b-gray-200  child:cursor-pointer font-DanaMedium">
              <div
                className={`text-xs  flex items-center gap-x-1 font-DanaDemiBold md:text-base${
                  optionShowModel === "توضیحات کالا"
                    ? "text-blue-600 border-b-2 border-b-blue-600 text-xs font-DanaDemiBold md:text-base"
                    : ""
                }`}
                onClick={(e) => setOptionShowModel("توضیحات کالا")}
              >
                توضیحات <span className="hidden md:block">کالا</span>
              </div>
              <div
                onClick={(e) => setOptionShowModel("مشخصات کالا")}
                className={`text-xs  flex items-center gap-x-1 font-DanaDemiBold md:text-base${
                  optionShowModel === "مشخصات کالا"
                    ? "text-blue-600 border-b-2 border-b-blue-600 text-xs font-DanaDemiBold md:text-base"
                    : ""
                }`}
              >
                مشخصات <span className="hidden md:block">کالا</span>
              </div>
              <div
                onClick={(e) => setOptionShowModel("توضیحات تکمیلی")}
                className={`text-xs  font-DanaDemiBold md:text-base${
                  optionShowModel === "توضیحات تکمیلی"
                    ? "text-blue-600 border-b-2 border-b-blue-600 text-xs font-DanaDemiBold md:text-base"
                    : ""
                }`}
              >
                توضیحات تکمیلی
              </div>
              <div
                onClick={(e) => setOptionShowModel(e.target.innerHTML)}
                className={`text-xs  font-DanaDemiBold md:text-base${
                  optionShowModel === "نظرات"
                    ? "text-blue-600 border-b-2 border-b-blue-600 text-xs font-DanaDemiBold md:text-base"
                    : ""
                }`}
              >
                نظرات
              </div>
            </div>
            {/* start main section */}
            <div className="py-5 px-2 md:px-4">
              {optionShowModel === "توضیحات کالا" && (
                <div>
                  <h3 className="font-DanaDemiBold text-base md:text-2xl">
                    معرفی محصول
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 mt-2">
                    <div>
                      <p
                        className="text-gray-500 text-sm/[28px] md:text-base/[32px]"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(
                            productInfo?.productInfo.moreDesc
                          ),
                        }}
                      ></p>
                    </div>
                    <div>
                      <img
                        src={`http://localhost:3001/uploads/covers/${productInfo?.productInfo.images[0]}`}
                        alt={productInfo?.productInfo.images[0]}
                        className="w-[290px] mx-auto"
                      />
                    </div>
                  </div>
                </div>
              )}
              {optionShowModel === "مشخصات کالا" && (
                <div>
                  <h3 className="font-DanaDemiBold text-base md:text-2xl">
                    طراحی و کیفیت ساخت {productInfo?.productInfo.title}
                  </h3>
                  <div>
                    <p
                      className="text-gray-500 feature text-sm/[28px] md:text-base/[32px] space-y-8 mt-4"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          productInfo?.productInfo.productFeature
                        ),
                      }}
                    ></p>
                    <img
                      src={`http://localhost:3001/uploads/covers/${productInfo?.productInfo.images[1]}`}
                      alt={productInfo?.productInfo.images[1]}
                      className="mx-auto mt-8 h-96 rounded-md  overflow-hidden"
                    />
                  </div>
                </div>
              )}
              {optionShowModel === "توضیحات تکمیلی" && (
                <div>
                  <h3 className="font-DanaDemiBold text-base md:text-2xl">
                    مشخصات فنی
                  </h3>
                  <FeatureList features={productInfo?.features} />
                </div>
              )}
              {optionShowModel === "نظرات" && (
                <div>
                  <Comments
                    productID={productInfo?.productInfo._id}
                    comments={productInfo?.comments}
                  />
                </div>
              )}
            </div>
          </div>
          <ProductBoxInfo
            productCount={productCount}
            setProductCount={setProductCount}
            setColorChoose={setColorChoose}
            colorChoose={colorChoose}
            product={productInfo}
          />
        </div>
      </div>
      {/* same product releated to this product */}
      <SameProduct category={productInfo?.productInfo.category._id} />
      <Footer />
      <FooterMenu />
    </div>
  );
}

export default ProductPage;
