import * as yup from "yup";
const phoneReg = /^\+88|0\d{10}/;

export const UserInfoValidation = () =>
  yup.object().shape({
    name: yup.string().required("This field is required"),
    username: yup.string().required("This field is required"),
    password: yup.string().required("This field is required"),
    phone: yup.string().max(11).min(11).required("Phone number is required"),
    email: yup.string().email(),
    roleId: yup.string().required("This field is required"),
  });

export const UserInfoValidationForEdit = () =>
  yup.object().shape({
    name: yup.string().required("This field is required"),
    username: yup.string().required("This field is required"),
    password: yup.string(),
    phone: yup.string().max(11).min(11).required("Phone number is required"),
    email: yup.string().email(),
    roleId: yup.string().required("This field is required"),
  });

export const UserResetPassInfoValidation = () =>
  yup.object().shape({
    password: yup.string().min(6).max(16).required("This field is required"),
  });

export const UserPassInfoValidation = () =>
  yup.object().shape({
    current_password: yup.string().required("This field is required"),
    new_password: yup
      .string()
      .min(6)
      .max(16)
      .required("This field is required"),
  });

export const ProfileInfoValidation = () =>
  yup.object().shape({
    name: yup.string().required("This field is required"),
    username: yup.string().required("This field is required"),
    current_password: yup.string(),
    password: yup
      .string()
      .when("current_password", (current_password, schema) => {
        // console.log(current_password)
        if (current_password?.[0]?.length > 0) {
          return schema.required("This field is required");
        }
        return schema;
      }),
    phone: yup
      .string()
      .matches(phoneReg, "Phone number is not valid")
      .max(11)
      .min(11)
      .required("Phone number is required"),
    email: yup.string().email(),
  });
