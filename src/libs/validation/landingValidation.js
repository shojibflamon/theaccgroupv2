import * as yup from "yup";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

export const landingFormValidation = () =>
  yup.object().shape({
    thumbnail: yup.array().min(1).max(5).required("This field is required"),
    //   .test(
    //     "format",
    //     "Not Image valide images.",
    //     (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
    //   )
    // headtext: yup.string().required("Email is required"),
  });
