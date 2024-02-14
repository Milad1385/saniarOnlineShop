import React, { useEffect, useState } from "react";
import Table from "../../../../Components/AdminPanel/Table/Table";
import EmptyError from "../../../../Components/UserPanel/EmptyError/EmptyError";
import DeleteModal from "../../../../Components/DeleteModal/DeleteModal";
import useGetUsers from "../../../../Hooks/AdminPanel/User/useGetUsers";
import useBanUser from "../../../../Hooks/AdminPanel/User/useBanUser";
import { getUserToken } from "../../../../Utils/Funcs/utils";
import StatusModal from "../../../../Components/SuccessModal/SuccessModal";
import useDelete from "../../../../Hooks/AdminPanel/User/useDelete";
import Loader from "../../../../Components/Loader/Loader";
import DetailModal from "../../../../Components/DetailModal/DetailModal";
import useRole from "../../../../Hooks/AdminPanel/User/useRole";
import Pagination from "../../../../Components/Pagination/Pagination";
import EditModal from "../../../../Components/EditModal/EditModal";
import { useForm } from "react-hook-form";
import { registerSchema } from "../../../../Pages/Register/RegisterSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import useEdit from "../../../../Hooks/AdminPanel/User/useEdit";

function UsersList() {
  const [userId, setUserId] = useState(null);
  const [phone, setPhone] = useState(null);
  const [role, setRole] = useState("");
  const [image, setImage] = useState({});
  const [lastImage, setLastImage] = useState("");
  const [isShowBanModal, setIsShowBanModal] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowRoleModal, setIsShowRoleModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);

  const pageNum = new URLSearchParams(window.location.search).get("page");
  const [page, setPage] = useState(pageNum);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    setPage(pageNum || 1);
  }, [pageNum]);

  const { data: users, isLoading } = useGetUsers(page);
  const { mutateAsync: banUser } = useBanUser();
  const { mutateAsync: deleteUser } = useDelete();
  const { mutateAsync: changeUserRole } = useRole();
  const { mutateAsync: editUser, isLoading: editLoading } = useEdit();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema) });

  const banUserHandler = async () => {
    const info = {
      id: userId,
      token: getUserToken(),
      phone,
    };
    const { status } = await banUser(info);
    if (status === 200) {
      setIsSuccessModal(true);
      setIsShowBanModal(false);
      setMsg("کاربر با موفقیت بن شد");
    }
  };

  const deleteUserHandler = async () => {
    const info = {
      id: userId,
      token: getUserToken(),
    };

    const result = await deleteUser(info);
    setIsShowDeleteModal(false);
    setIsSuccessModal(true);
    setMsg("کاربر با موفقیت حذف شد");
  };

  const changeUserRoleHandler = async () => {
    const info = {
      token: getUserToken(),
      id: userId,
      role,
    };

    const result = await changeUserRole(info);
    if (result.ok) {
      setIsShowRoleModal(false);
      setIsSuccessModal(true);
      setMsg("نقش کاربر با موفقیت ویرایش شد");
      setRole("");
    }
  };

  const editUserHandler = (user) => {
    console.log(user);
    setIsShowEditModal(true);
    setUserId(user._id);
    setValue("name", user.name);
    setValue("username", user.username);
    setValue("email", user.email);
    setValue("password", user.password);
    setValue("phone", user.phone);
    setLastImage(user.image);
  };

  const submitEditUser = async (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phone", data.phone);
    formData.append("image", image);
    formData.append("lastImage", lastImage);
    const info = {
      token: getUserToken(),
      id: userId,
      body: formData,
    };
    const result = await editUser(info);
    if (result.status === 200) {
      setIsShowEditModal(false);
      setMsg("کاربر با موفقیت ویرایش شد");
      setIsSuccessModal(true);
      setImage({});
    }
  };
  return (
    <>
      <div className="pb-6">
        {isLoading ? (
          <div className=" bg-black/50 fixed inset-0 flex items-center justify-center z-50">
            <Loader />
          </div>
        ) : (
          <Table title={"لیست"} main={"کاربران"}>
            {users.users?.length ? (
              <table className="user-table mt-7">
                <thead className="">
                  <tr className="child:font-Lalezar text-base md:text-xl bg-blue-600  text-white child:p-3 text-center">
                    <td>شماره</td>
                    <td>پروفایل</td>
                    <td>نام</td>
                    <td>نام کاربری</td>
                    <td>نقش</td>
                    <td>شماره</td>
                    <td>تاریخ</td>
                    <td>حذف</td>
                    <td>نقش</td>
                    <td>جزییات</td>
                    <td>ویرایش</td>
                    <td>بن</td>
                  </tr>
                </thead>
                <tbody className="text-sm md:text-base">
                  <>
                    {users.users?.map((user, index) => (
                      <tr
                        className="child:p-3 text-center font-DanaMedium"
                        key={user._id}
                      >
                        <td>{index + 1}</td>
                        <td>
                          <div className="w-14 h-14  mx-auto bg-gray-200 rounded-full flex-center">
                            <img
                              src={`http://localhost:3001/uploads/covers/${user.image}`}
                              className="w-12 h-12 rounded-full"
                            />
                          </div>
                        </td>
                        <td>{user.name}</td>
                        <td>{user.username}</td>
                        <td>
                          {user.role === "ADMIN" ? "ادمین" : "کاربر عادی"}
                        </td>
                        <td>{user.phone}</td>
                        {/* <td>{user.email}</td> */}
                        <td>{user.date}</td>
                        <td>
                          <button
                            className="bg-red-600 text-white w-16 py-1 text-base md:text-lg rounded-md font-Lalezar"
                            onClick={() => {
                              setIsShowDeleteModal(true);
                              setUserId(user._id);
                            }}
                          >
                            حذف
                          </button>
                        </td>
                        <td>
                          <button
                            className="bg-amber-500 text-white w-16 py-1 text-base md:text-lg rounded-md font-Lalezar"
                            onClick={() => {
                              setIsShowRoleModal(true);
                              setUserId(user._id);
                            }}
                          >
                            نقش
                          </button>
                        </td>
                        <td>
                          <button className="bg-gray-600 text-white w-16 py-1 text-base md:text-lg rounded-md font-Lalezar">
                            جزییات
                          </button>
                        </td>
                        <td>
                          <button
                            className="bg-blue-600 text-white w-16 py-1 text-base md:text-lg rounded-md font-Lalezar"
                            onClick={() => editUserHandler(user)}
                          >
                            ویرایش
                          </button>
                        </td>
                        <td>
                          <button
                            className="bg-pink-600 text-white w-16 py-1 text-base md:text-lg rounded-md font-Lalezar"
                            onClick={() => {
                              setIsShowBanModal(true);
                              setUserId(user._id);
                              setPhone(user.phone);
                            }}
                          >
                            بن
                          </button>
                        </td>
                      </tr>
                    ))}
                  </>
                </tbody>
              </table>
            ) : (
              <EmptyError msg={"هیچ کاربری در سایت ثبت نام نکرده است"} />
            )}
          </Table>
        )}
        <Pagination
          count={users?.paginatedNumber}
          page={page}
          setPage={setPage}
        />
      </div>
      {isShowBanModal && (
        <DeleteModal
          title={"آیا از بن کردن اطمینان دارید ؟"}
          onClose={() => setIsShowBanModal(false)}
          onClick={() => banUserHandler()}
        />
      )}
      {isSuccessModal && (
        <StatusModal
          onClose={setIsSuccessModal}
          title={msg}
          text={"خیلی هم عالی"}
          icon={"face-smile"}
          color="text-blue-600"
          bg="bg-blue-600"
          onClick={() => setIsSuccessModal(false)}
        />
      )}
      {isShowDeleteModal && (
        <DeleteModal
          title={"آیا از حذف کردن اطمینان دارید ؟"}
          onClick={() => deleteUserHandler()}
          onClose={() => setIsShowDeleteModal(false)}
        />
      )}
      {isShowRoleModal && (
        <DetailModal onClose={setIsShowRoleModal}>
          <div className="bg-white w-[350px] px-5 pt-4 pb-6 space-y-5 font-MorabbaBold">
            <h3 className="text-center  text-lg md:text-2xl lg:text-3xl">
              نقش جدید را وارد کنید
            </h3>
            <div className="flex items-center justify-between bg-gray-100 py-2 px-3">
              <input
                type="text"
                placeholder="نقش کاربر را وارد کنید ..."
                className="outline-none w-full bg-gray-100 font-DanaMedium"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
              <svg className="w-6 h-6 md:w-9 md:h-9 text-zinc-600">
                <use href="#user"></use>
              </svg>
            </div>
            <button
              className="bg-blue-600 text-white flex-center w-full py-3 text-base md:text-lg lg:text-xl"
              onClick={changeUserRoleHandler}
            >
              ویرایش نقش
            </button>
          </div>
        </DetailModal>
      )}
      {isShowEditModal && (
        <EditModal onClose={setIsShowEditModal}>
          <form
            onSubmit={handleSubmit(submitEditUser)}
            className="mt-10 flex items-center justify-center flex-col gap-6 child:rounded-sm"
          >
            <div className="w-full">
              <div className="bg-gray-100 flex items-center gap-x-2 py-2 px-3 w-full">
                <svg className="w-6 h-6">
                  <use href="#user"></use>
                </svg>
                <input
                  type="text"
                  placeholder="نام جدید کاربر را وارد کنید..."
                  {...register("name")}
                  className="w-full text-sm md:text-base bg-transparent outline-none"
                />
              </div>
              {errors.name && (
                <span className="absolute  text-red-600 font-DanaMedium text-xs md:text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="w-full">
              <div className="bg-gray-100 flex items-center gap-x-2 py-2 px-3 w-full">
                <svg className="w-6 h-6">
                  <use href="#life-style"></use>
                </svg>
                <input
                  type="text"
                  placeholder="نام کاربری کاربر جدید را وارد کنید..."
                  {...register("username")}
                  className="w-full text-sm md:text-base bg-transparent outline-none"
                />
              </div>
              {errors.username && (
                <span className="absolute  text-red-600 font-DanaMedium text-xs md:text-sm">
                  {errors.username.message}
                </span>
              )}
            </div>
            <div className="w-full">
              <div className="bg-gray-100 flex items-center gap-x-2 py-2 px-3 w-full">
                <svg className="w-6 h-6">
                  <use href="#phone"></use>
                </svg>
                <input
                  type="text"
                  {...register("phone")}
                  placeholder="شماره تلفن جدید کاربر را وارد کنید..."
                  className="w-full text-sm md:text-base bg-transparent outline-none"
                />
              </div>
              {errors.phone && (
                <span className="absolute  text-red-600 font-DanaMedium text-xs md:text-sm">
                  {errors.phone.message}
                </span>
              )}
            </div>
            <div className="w-full">
              <div className="bg-gray-100 flex items-center gap-x-2 py-2 px-3 w-full">
                <svg className="w-6 h-6">
                  <use href="#envelope"></use>
                </svg>
                <input
                  type="text"
                  {...register("email")}
                  placeholder="ایمیل جدید کاربر را وارد کنید..."
                  className="w-full text-sm md:text-base bg-transparent outline-none"
                />
              </div>
              {errors.email && (
                <span className="absolute  text-red-600 font-DanaMedium text-xs md:text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="w-full">
              <div className="bg-gray-100 flex items-center gap-x-2 py-2 px-3 w-full">
                <svg className="w-6 h-6">
                  <use href="#lock"></use>
                </svg>
                <input
                  type="text"
                  {...register("password")}
                  placeholder="رمز عبور جدید کاربر را وارد کنید..."
                  className="w-full text-sm md:text-base bg-transparent outline-none"
                />
              </div>
              {errors.password && (
                <span className="absolute  text-red-600 font-DanaMedium text-xs md:text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="w-full">
              <div className="bg-gray-100 flex items-center gap-x-2 py-2 px-3 w-full">
                <svg className="w-6 h-6">
                  <use href="#image"></use>
                </svg>
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-blue-600 text-white text-xl font-MorabbaBold py-3"
            >
              {editLoading ? "در حال ویرایش ..." : "ویرایش اطلاعات"}
            </button>
          </form>
        </EditModal>
      )}
    </>
  );
}

export default UsersList;
