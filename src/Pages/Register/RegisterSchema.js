import * as Yup from "yup";

const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "نام و نام خانوادگی حداقل باید 3 کاراکتر داشته باشه")
    .max(18, "نام و نام خانوادگی حداکثر باید 12 کاراکتر داشته باشه")
    .required("نام و نام خانوادگی را وارد نمایید"),
  username: Yup.string()
    .min(3, "نام کاربری حداقل باید 3 کاراکتر داشته باشه")
    .max(12, "نام کاربری حداکثر باید 12 کاراکتر داشته باشه")
    .required("نام کاربری را وارد نمایید"),
  phone: Yup.string()
    .min(11, "شماره حداقل باید 11 کاراکتر داشته باشه")
    .max(11, "شماره حداکثر باید 11 کاراکتر داشته باشه")
    .required("شماره را وارد نمایید"),
  password: Yup.string()
    .min(8, "رمز عبور حداقل باید 11 کاراکتر داشته باشه")
    .required("شماره را وارد نمایید"),
  email: Yup.string()
    .email("ایمیل وارد شده معتبر نمی‌باشد")
    .min(10, "ایمیل حداقل باید 10 کاراکتر داشته باشه")
    .max(30, "ایمیل حداکثر باید 30 کاراکتر داشته باشه")
    .required("ایمیل را وارد نمایید"),
});

export { registerSchema };