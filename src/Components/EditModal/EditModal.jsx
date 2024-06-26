import React, { useEffect } from "react";

function EditModal({ onClose, children }) {
  useEffect(() => {
    const hideModal = (event) => {
      if (event.target.id === "edit-modal") {
        onClose(false);
      }
    };

    document.addEventListener("click", hideModal);

    return () => document.removeEventListener("click", hideModal);
  }, []);
  return (
    <div
      id="edit-modal"
      className="fixed inset-0 bg-black/50 z-50 transition-all flex items-center justify-center"
    >
      <div className="bg-white w-[350px] md:w-[450px] mx-4 p-6 md:p-8">
        <h2 className="text-xl md:text-3xl font-MorabbaBold text-center">
          اطلاعات جدید را وارد نمایید
        </h2>
        {children}
      </div>
    </div>
  );
}

export default EditModal;
