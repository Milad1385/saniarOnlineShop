import React from "react";
import { Link } from "react-router-dom";
function TitleCat({ main, desc, link, isMain }) {
  return (
    <div className="flex items-center justify-between p-4  bg-white shadow-sm rounded-md mt-5">
      <div className="flex items-center gap-x-2 font-DanaDemiBold text-lg">
        <img
          src="/images/category/square.png"
          className="select-none"
          alt="cat"
        />
        <span className="text-sm md:text-base select-none">
          {main} <span className="text-blue-600">{desc}</span>
        </span>
      </div>
      <div>
        {isMain ? null : (
          <Link
            to={link ? link : "/products"}
            className="flex items-center md:gap-x-1  gap-x-1.5 font-DanaDemiBold text-sm md:text-base"
          >
            مشاهده همه
            <svg className="w-4 md:w-5 h-4 md:h-5 text-blue-600 mb-0.5">
              <use href="#arrow-d"></use>
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
}

export default TitleCat;
