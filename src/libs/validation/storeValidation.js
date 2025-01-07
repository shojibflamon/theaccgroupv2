import * as yup from "yup";

export const StoreInfoValidation = () =>
  yup.object().shape({
    outlet: yup.string().required("This field is required"),
    number: yup
      .string()
      .max(15)
      .min(5)
      .required("Phone number is required"),
    email: yup.string().email().required("This field is required"),
    address: yup.string().required("This field is required"),
  });
