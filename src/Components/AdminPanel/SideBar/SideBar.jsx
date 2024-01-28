import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import DeleteModal from "../../DeleteModal/DeleteModal";

function SideBar({ isMenuShow, onShow }) {
  const [isShowExitModal, setIsShowExitModal] = useState(false);
  return (
    <>
      <div
        className={`w-[235px] md:w-[265px] fixed ${
          isMenuShow ? "-right-[6px]" : "-right-[265px]"
        } bg-blue-700 z-50 overflow-auto transition-all lg:sticky top-0 text-white min-h-screen `}
      >
        <h3 className="font-Lalezar text-lg md:text-[22px] text-center mt-2.5 border-b-2 pb-2 border-b-blue-500">
          به ادمین پنل خوش آمدید
        </h3>
        <div className="py-2 px-3">
          <ul className="side-links text-base md:text-xl font-Lalezar space-y-3 overflow-auto">
            {" "}
            <li>
              <NavLink
                to={"/admin-panel/main"}
                className="flex items-center gap-x-2 cursor-pointer w-full"
              >
                <svg className="w-6 h-6">
                  <use href="#home"></use>
                </svg>
                <span className="">صفحه اصلی</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/admin-panel/users"}
                className="flex items-center gap-x-2 cursor-pointer "
              >
                <svg className="w-6 h-6">
                  <use href="#user"></use>
                </svg>
                <span className="">کاربران</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/admin-panel/products"}
                className="flex items-center gap-x-2 cursor-pointer"
              >
                <svg className="w-6 h-6">
                  <use href="#square"></use>
                </svg>
                <span className="">محصولات</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/admin-panel/comments"}
                className="flex items-center gap-x-2 cursor-pointer"
              >
                <svg className="w-6 h-6">
                  <use href="#chat-bubble-left-right"></use>
                </svg>
                <span className="">کامنت ها</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/admin-panel/orders"}
                className="flex items-center gap-x-2 cursor-pointer"
              >
                <svg className="w-6 h-6">
                  <use href="#shopping-cart"></use>
                </svg>
                <span className="">سفارشات</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/admin-panel/discount"}
                className="flex items-center gap-x-2 cursor-pointer"
              >
                <svg className="w-6 h-6">
                  <use href="#gift"></use>
                </svg>
                <span className="">کد تخفیف</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/admin-panel/tickets"}
                className="flex items-center gap-x-2 cursor-pointer"
              >
                <svg className="w-6 h-6">
                  <use href="#ticket"></use>
                </svg>
                <span className="">تیکت ها</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/admin-panel/slider"}
                className="flex items-center gap-x-2 cursor-pointer"
              >
                <svg className="w-6 h-6">
                  <use href="#image"></use>
                </svg>
                <span className="">اسلایدر </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/admin-panel/articles"}
                className="flex items-center gap-x-2 cursor-pointer"
              >
                <svg className="w-6 h-6">
                  <use href="#article"></use>
                </svg>
                <span className="">مقاله ها</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/admin-panel/capmaign"}
                className="flex items-center gap-x-2 cursor-pointer"
              >
                <svg className="w-6 h-6">
                  <use href="#pencil"></use>
                </svg>
                <span className="">کمپین</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/admin-panel/ads-banner"}
                className="flex items-center gap-x-2 cursor-pointer"
              >
                <svg className="w-6 h-6">
                  <use href="#image"></use>
                </svg>
                <span className="">بنر تبلیغات</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/admin-panel/category"}
                className="flex items-center gap-x-2 cursor-pointer"
              >
                <svg className="w-6 h-6">
                  <use href="#link"></use>
                </svg>
                <span className="">دسته بندی </span>
              </NavLink>
            </li>
            {/* <li>
            <NavLink
              to={"/admin-panel/advance"}
              className="flex items-center gap-x-2 cursor-pointer"
            >
              <svg className="w-6 h-6">
                <use href="#life-style"></use>
              </svg>
              <span className="">مشخصه ها</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/admin-panel/feature"}
              className="flex items-center gap-x-2 cursor-pointer"
            >
              <svg className="w-6 h-6">
                <use href="#book"></use>
              </svg>
              <span className="">ویژگی</span>
            </NavLink>
          </li> */}
            <li onClick={() => setIsShowExitModal(true)}>
              <a className="flex items-center gap-x-2 cursor-pointer">
                <svg className="w-6 h-6">
                  <use href="#exit"></use>
                </svg>
                <span className="">خروج</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      {isShowExitModal && (
        <DeleteModal
          onClose={setIsShowExitModal}
          title="آیا از خروج اطمینان دارید ؟"
        />
      )}
      <div
        onClick={() => onShow(false)}
        className={`bg-black/50 fixed inset-0 z-40 ${
          isMenuShow ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      ></div>
    </>
  );
}

export default SideBar;
