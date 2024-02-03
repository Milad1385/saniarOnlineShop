import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../../App";

function TopBar({ onShow }) {
  const [isDark, setIsDark] = useState("light");
  const {setIsShowAdminMenu } = useContext(AppContext);
  const addDarkModeClass = () => {
    if (isDark === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };
  return (
    <>
      <div className="bg-blue-600 px-4 sticky top-0 z-40 text-white h-14 mb-5 flex md:hidden items-center justify-between">
        <div onClick={() => setIsShowAdminMenu(true)}>
          <svg className="w-7 h-7">
            <use href="#bars-3"></use>
          </svg>
        </div>
        <h3 className="font-Lalezar text-lg">پنل مدیریت ادمین</h3>
        <Link to={"/"} title="فروشگاه">
          <svg className="w-7 h-7">
            <use href="#shop"></use>
          </svg>
        </Link>
      </div>
      <div className="flex items-center justify-between flex-col md:flex-row gap-y-6">
        <div className="flex items-center gap-x-3">
          <div className="w-16 h-16 flex-center bg-gray-300 shadow rounded-full">
            <img src="/images/user.png" className="w-14 h-14" alt="" />
          </div>
          <div>
            <h3 className="font-Lalezar text-lg">میلاد سلامیان</h3>
            <h6 className="font-Lalezar text-base text-gray-500">
              مدیریت اصلی
            </h6>
          </div>
        </div>
        <div className="flex items-center gap-x-3">
          <div className="bg-white pr-3 pl-1.5 py-1.5 rounded-md shadow-sm flex items-center justify-between ">
            <input
              type="text"
              placeholder="جستجو کنید..."
              className="outline-none border-none bg-transparent font-DanaDemiBold text-sm md:text-base"
            />
            <button className="bg-blue-600 text-white rounded-md p-1">
              <svg className="w-6 h-6">
                <use href="#magni-glass"></use>
              </svg>
            </button>
          </div>
          <svg
            className="w-10 h-10 bg-blue-600 shadow-blue text-white rounded-md p-1.5"
            onClick={() => {
              setIsDark((prev) => (prev === "dark" ? "light" : "dark"));
              addDarkModeClass();
            }}
          >
            <use href="#bell"></use>
          </svg>
        </div>
      </div>
    </>
  );
}

export default TopBar;
