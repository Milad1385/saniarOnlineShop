import React from "react";
import PageTitle from "../../../Components/UserPanel/PageTitle/PageTitle";
import CommentBox from "../../../Components/UserPanel/CommentBox/CommentBox";
function Comments() {
  return (
    <div>
      <PageTitle title={"کامنت های من"} icon={"chat-bubble-left-right"} />
      <div className="bg-white mt-6">
        <p class="bg-gray-200 font-DanaDemiBold p-2 rounded-tl-md  rounded-tr-md">
          دیدگاه ها
        </p>
        <div className="p-[18px] space-y-8 divide-y-2">
          <CommentBox/>
          <CommentBox/>
          <CommentBox/>
        </div>
      </div>
    </div>
  );
}

export default Comments;
