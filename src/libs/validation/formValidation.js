import * as yup from "yup";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

export const UploadFormValidation = () =>
  yup.object().shape({
    author_name: yup
      .string()
      .test("len", "Must be exactly 255 characters", (val) => val.length < 255)
      .required("This field is required"),
    // reading_time: yup.string().required("This field is required"),
    headline: yup
      .string()
      .test("len", "Must be exactly 200 characters", (val) => val.length < 200)
      .required("This field is required"),
    description: yup.string().required("This field is required"),

    // category: yup.object().required("This field is required"),
    thumbnail: yup
      .mixed()
      .required("This field is required")
      .test(
        "format",
        "Not Image valide images.",
        (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
      ),
    //   pdf:yup.string().url(),
  });

yup.string();

export const adminLoginFormValidation = () =>
  yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required"),
  });
