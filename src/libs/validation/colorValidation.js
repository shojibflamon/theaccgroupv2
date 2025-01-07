import * as yup from "yup";

export const ColorInfoValidation = () =>
  yup.object().shape({
    title: yup.string().required("This field is required"),
    hax_code: yup.string().required("This field is required"),
  });
