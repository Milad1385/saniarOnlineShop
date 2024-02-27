import React, { useEffect, useContext, useState, useId } from "react";
import { AppContext } from "../../../App";
import { getUserToken } from "../../../Utils/Funcs/utils";
import Sppiner from "./../../../Components/Sppiner/Spinner";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../Register/RegisterSchema";
import { getUserInfo } from "../../../services/userApi";
import StatusModal from "../../../Components/SuccessModal/SuccessModal";
import useEdit from "../../../Hooks/AdminPanel/User/useEdit";
import useGetMe from "../../../Hooks/useGetMe/useGetMe";
import PageTitle from "../../../Components/AdminPanel/PageTitle/PageTitle";
import Input from "../../../Components/AdminPanel/Input/Input";

function MyInfo() {
  const { setIsShowAdminMenu } = useContext(AppContext);
  const [isShowErrModal, setIsShowErrModal] = useState(false);
  const [isShowSuccessModal, setIsShowSuccessModal] = useState(false);
  const [msg, setMsg] = useState("");
  const [image, setImage] = useState({});
  const [currImage, setCurrImage] = useState(null);
  const [adminId, setAdminId] = useState("");

  const { data: userInfo } = useGetMe(getUserToken());

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: async () => {
      const result = await getUserInfo(getUserToken());
      setAdminId(result.userInfo._id);
      return {
        name: result.userInfo.name,
        username: result.userInfo.username,
        phone: result.userInfo.phone,
        email: result.userInfo.email,
        password: result.userInfo.password,
      };
    },
  });

  const { mutateAsync: editUser, isLoading: editLoading } = useEdit();

  useEffect(() => {
    setIsShowAdminMenu(false);
  }, []);

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setCurrImage(URL.createObjectURL(file));

      console.log(URL.createObjectURL(file));
    }
  };

  const editMyInfoHandler = async (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phone", data.phone);
    formData.append("image", image);
    formData.append("lastImage", userInfo?.userInfo.image);
    const info = {
      token: getUserToken(),
      id: adminId,
      body: formData,
    };
    const result = await editUser(info);
    if (result.status === 200) {
      setMsg("کاربر با موفقیت ویرایش شد");
      setIsShowSuccessModal(true);
      setImage({});
    } else {
      setMsg("ویرایش با خطا مواجه شد");
      setIsShowErrModal(true);
    }
  };
  return (
    <>
      <div className="container pb-5">
        <PageTitle key={useId()} main={"اطلاعات من"} desc={"ویرایش"} />
        <div className="relative my-16 flex-center">
          <img
            src={
              currImage
                ? currImage
                : userInfo?.userInfo.image
                ? `http://localhost:3001/uploads/covers/${userInfo?.userInfo.image}`
                : "/images/user.png"
            }
            className="w-32 md:w-44 h-32 md:h-44 rounded-full"
          />
          <input
            type="file"
            id="uploader"
            className="hidden"
            onChange={handleUploadImage}
          />
          <label
            htmlFor="uploader"
            className="absolute bottom-0  right-[120px] md:right-[510px] flex-center w-10 md:w-14 h-10 md:h-14 rounded-full bg-blue-600  border-2 md:border-4 border-white  cursor-pointer transition-colors"
          >
            <svg className="w-5 md:w-6 h-5 md:h-6 text-white">
              <use href="#arrow-path-rounded-square"></use>
            </svg>
          </label>
        </div>
        <form
          onSubmit={handleSubmit(editMyInfoHandler)}
          className="bg-white py-6 px-6 rounded-md shadow font-Dana text-zinc-700"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 md:gap-6 text-sm md:text-base">
            <Input
              register={register}
              errors={errors}
              icon={"user"}
              placeholder={"نام خود را وارد کنید ..."}
              type="text"
              name="name"
            />
            <Input
              register={register}
              errors={errors}
              placeholder={"نام کاربری خود را وارد کنید ..."}
              icon={"telegram"}
              type={"text"}
              name={"username"}
            />
            <Input
              register={register}
              errors={errors}
              placeholder={"شماره تلفن خود را وارد کنید ..."}
              icon={"phone"}
              type={"text"}
              name={"phone"}
            />
            <Input
              register={register}
              errors={errors}
              placeholder={"ایمیل خود را وارد کنید ..."}
              icon={"envelope"}
              type={"email"}
              name={"email"}
            />
            <Input
              register={register}
              errors={errors}
              placeholder={"رمز عبور خود را وارد کنید ..."}
              icon={"lock"}
              type={"password"}
              name={"password"}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600  font-Lalezar p-2 w-[145px] rounded-md text-white text-base md:text-xl shadow-blue mt-6"
          >
            {false ? <Sppiner isBtn={true} /> : "ویرایش اطلاعات"}
          </button>
        </form>
      </div>
      {isShowErrModal && (
        <StatusModal
          onClose={setIsShowErrModal}
          title={msg}
          text={"تلاش مجدد !"}
          icon={"face-frown"}
          color="text-red-600"
          bg="bg-red-600"
          onClick={() => setIsShowErrModal(false)}
        />
      )}
      {isShowSuccessModal && (
        <StatusModal
          onClose={setIsShowSuccessModal}
          title={msg}
          text={"خیلی هم عالی"}
          icon={"face-smile"}
          color="text-blue-600"
          bg="bg-blue-600"
          onClick={() => setIsShowSuccessModal(false)}
        />
      )}
    </>
  );
}

export default MyInfo;
