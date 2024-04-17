import React from "react";

function OrderStatus({ isActive2, isActive3, isActive4 }) {
  return (
    <div className="flex items-center justify-between   font-DanaDemiBold">
      <div className="w-5 h-5 rounded-full bg-gray-500 shadow shrink-0"></div>
      <span className="block w-full h-1.5 bg-gray-200 order-active"></span>
      <div className="relative">
        <div className="text-sm md:text-base w-8 md:w-10 h-8 md:h-10 rounded-full bg-white shadow flex-center relative shrink-0 order-active-circle">
          1
        </div>
        <span className="text-xs md:text-base absolute -top-8 -right-2 md:-right-3 w-[70px]">سبد خرید</span>
      </div>
      <span
        className={`block w-full h-1.5 bg-gray-200 ${
          isActive2 && "order-active"
        }`}
      ></span>
      <div className="relative">
        <div
          className={`text-sm md:text-base w-8 md:w-10 h-8 md:h-10 rounded-full bg-white shadow flex-center relative shrink-0 ${
            isActive2 && "order-active-circle"
          }`}
        >
          2
        </div>
        <span className="text-xs md:text-base absolute -top-8 -right-5 md:-right-7 w-[115px]">
          جزییات پرداخت
        </span>
      </div>
      <span
        className={`block w-full h-1.5 bg-gray-200 ${
          isActive3 && "order-active"
        }`}
      ></span>
      <div className="relative">
        <div
          className={`text-sm md:text-base w-8 md:w-10 h-8 md:h-10 rounded-full bg-white shadow flex-center relative shrink-0 ${
            isActive3 && "order-active-circle"
          }`}
        >
          3
        </div>
        <span className="text-xs md:text-base absolute -top-8 -right-3 md:-right-6 w-[100px]">تکمیل سفارش</span>
      </div>
      <span
        className={`block w-full h-1.5 bg-gray-200 ${
          isActive4 && "order-active"
        }`}
      ></span>
      <div className="w-5 h-5 rounded-full bg-gray-400 shadow shrink-0"></div>
    </div>
  );
}

export default OrderStatus;
