import React from "react";
import PageTitle from "../../../Components/UserPanel/PageTitle/PageTitle";
import EmptyError from "../../../Components/UserPanel/EmptyError/EmptyError";
import { Link } from "react-router-dom";

function Tickets() {
  return (
    <>
      <div>
        <PageTitle title={"لیست تیکت ها"} icon={"ticket"} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-4 md:gap-x-8 mt-5 mx-auto ">
        <div className="flex items-center gap-x-2.5 md:gap-x-4 flex-grow md:flex-grow-0 md:w-60 bg-amber-400  p-2 rounded-2xl">
          <div className="flex-center w-14 h-14 md:w-[68px] md:h-[68px] bg-white/20 rounded-2xl">
            <svg className="w-8 h-8 md:w-9 md:h-9 text-white">
              <use href="#ticket"></use>
            </svg>
          </div>
          <div className="flex flex-col gap-y-1.5 md:gap-y-2 text-white">
            <span className="text-xs">همه تیکت ها</span>
            <span className="font-DanaDemiBold text-sm md:text-lg">5 عدد</span>
          </div>
        </div>
        <div className="flex items-center gap-x-2.5 md:gap-x-4 flex-grow md:flex-grow-0 md:w-60 bg-green-500  p-2 rounded-2xl">
          <div className="flex-center w-14 h-14 md:w-[68px] md:h-[68px] bg-white/20 rounded-2xl">
            <svg className="w-8 h-8 md:w-9 md:h-9 text-white">
              <use href="#envelope-open"></use>
            </svg>
          </div>
          <div className="flex flex-col gap-y-1.5 md:gap-y-2 text-white">
            <span className="text-xs">تیکت های باز</span>
            <span className="font-DanaDemiBold text-sm md:text-lg">0 دوره</span>
          </div>
        </div>
        <div className="flex items-center gap-x-2.5 md:gap-x-4 flex-grow md:flex-grow-0 md:w-60 bg-red-500  p-2 rounded-2xl">
          <div className="flex-center w-14 h-14 md:w-[68px] md:h-[68px] bg-white/20 rounded-2xl">
            <svg className="w-8 h-8 md:w-9 md:h-9 text-white">
              <use href="#chat-bubble-left-right"></use>
            </svg>
          </div>
          <div className="flex flex-col gap-y-1.5 md:gap-y-2 text-white">
            <span className="text-xs">بسته شده</span>
            <span className="font-DanaDemiBold text-sm md:text-lg">4 تیکت</span>
          </div>
        </div>
        <Link to={'/my-account/tickets/send-ticket'} class="flex items-center gap-x-4.5 w-full xs:w-auto md:w-[240px] font-danaDemiBold text-xl text-white bg-blue-600  p-4 md:p-6 rounded-2xl">
          <svg class="w-8 h-8">
            <use href="#plus-circle"></use>
          </svg>
          <span className="mr-2 font-DanaDemiBold">تیکت جدید</span>
        </Link>
      </div>
      <div className="table-container mt-6">
        <table class="bg-white">
          <thead>
            <tr className="child:border child:border-slate-300 child:p-2 child:font-DanaDemiBold">
              <th className="">شناسه</th>
              <th className="">عنوان</th>
              <th className="">تاریخ بروزسانی</th>
              <th className="">نمایش</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center child:border child:border-slate-300 child:p-2 child:font-DanaMedium">
              <td className="">1234</td>
              <td className="">
                <span className="">ارسال نشدن فلان سفارش به من </span>
                <span className="mr-2 bg-gray-500 text-white py-1 px-2 text-sm">
                  در انتظار پاسخ
                </span>
              </td>
              <td>25 آذر 1402 ساعت 20:30</td>
              <td>
                <Link to={"/my-account/tickets/answer-ticket/1"}>
                  <button className="flex-center mx-auto gap-x-2 bg-blue-600 text-white py-2 px-4 rounded-md shadow-blue">
                    نمایش
                    <svg className="w-5 h-5">
                      <use href="#eye"></use>
                    </svg>
                  </button>
                </Link>
              </td>
            </tr>
            <tr className="text-center child:border child:border-slate-300 child:p-2 child:font-DanaMedium">
              <td className="">1234</td>
              <td className="">
                <span className="">ارسال نشدن فلان سفارش به من </span>
                <span className="mr-2 bg-green-600 text-white py-1 px-2 text-sm">
                  پاسخ داده شده
                </span>
              </td>
              <td>25 آذر 1402 ساعت 20:30</td>
              <td>
                <Link to={"/my-account/tickets/answer-ticket/2"}>
                  <button className="flex-center mx-auto gap-x-2 bg-blue-600 text-white py-2 px-4 rounded-md shadow-blue">
                    نمایش
                    <svg className="w-5 h-5">
                      <use href="#eye"></use>
                    </svg>
                  </button>
                </Link>
              </td>
            </tr>
            <tr className="text-center child:border child:border-slate-300 child:p-2 child:font-DanaMedium">
              <td className="">1234</td>
              <td className="">
                <span className="">ارسال نشدن فلان سفارش به من </span>
                <span className="mr-2 bg-red-600 text-white py-1 px-2 text-sm">
                  بسته شده
                </span>
              </td>
              <td>25 آذر 1402 ساعت 20:30</td>
              <td>
                <Link to={"/my-account/tickets/answer-ticket/3"}>
                  <button className="flex-center mx-auto gap-x-2 bg-blue-600 text-white py-2 px-4 rounded-md shadow-blue">
                    نمایش
                    <svg className="w-5 h-5">
                      <use href="#eye"></use>
                    </svg>
                  </button>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-5">
        <EmptyError msg={"هیچ تیکتی ارسال نکردید"} />
      </div>
    </>
  );
}

export default Tickets;
