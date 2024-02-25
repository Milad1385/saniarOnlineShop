import React from "react";
import { Link } from "react-router-dom";

function ProductBox({ product }) {
  return (
    <div className="bg-white shadow-sm p-2.5 rounded-lg select-none">
      {/* start header */}
      <div className="flex items-center justify-between">
        <div className="bg-red-200 text-red-500 text-sm p-2 rounded-lg font-DanaDemiBold">
          {product.off ? product.off + "% تخفیف" : "فروش ویژه"}
        </div>
        <div className="flex items-center gap-x-1.5">
          <span className="bg-gray-200 block rounded-full p-1.5 text-zinc-700">
            <svg className="w-5 h-5">
              <use href="#compare"></use>
            </svg>
          </span>
          <span className="bg-gray-200 block rounded-full p-1.5 text-zinc-700">
            <svg className="w-5 h-5">
              <use href="#heart"></use>
            </svg>
          </span>
          <span className="bg-gray-200 block rounded-full p-1.5 text-zinc-700">
            <svg className="w-5 h-5">
              <use href="#eye"></use>
            </svg>
          </span>
        </div>
      </div>
      {/* start body */}
      <div className="mt-1.5">
        <Link to={`/product/${product.link}`}>
          <img
            src={`http://localhost:3001/uploads/covers/${product.images[0]}`}
            alt="product-image6.jpg"
            className="w-[180px] mx-auto"
          />
        </Link>
        <div className="flex  justify-between mt-2.5">
          <div className="">
            <h3 className="font-DanaDemiBold text-sm md:text-base">
              {product.title}
            </h3>
            <h5 className="text-sm text-gray-400 font-DanaMedium mt-1.5 line-clamp-1">
              {product.shortDesc}
            </h5>
          </div>
          <div className="flex flex-row-reverse gap-x-2">
            <div className="flex  gap-x-0.5">
              <svg className="w-4 h-4 text-yellow-400">
                <use href="#fill-star"></use>
              </svg>
            </div>
            <span className="text-xs text-gray-500 font-DanaDemiBold mt-1">
              {product.score}
            </span>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between bg-gray-100 p-2 rounded-lg">
          <div className="flex flex-col justify-center font-DanaDemiBold text-sm h-[53px]">
            <span>
              {product.off
                ? (
                    product.price -
                    (product.price * product.off) / 100
                  ).toLocaleString("fa")
                : product.price.toLocaleString("fa")}
              <span className="tracking-tighter mr-1">تومان</span>
            </span>
            {product.off !== 0 && (
              <span className="mt-2.5 line-through text-gray-400">
                {product.price.toLocaleString("fa")}{" "}
                <span className="tracking-tighter ml-1.5">تومان</span>
              </span>
            )}
          </div>
          <button className="bg-blue-600 flex items-center justify-center gap-x-1 text-white shadow-blue p-2 rounded-md">
            <svg className="w-6 h-6">
              <use href="#shop-bag"></use>
            </svg>
            خرید محصول
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductBox;
