import * as yup from "yup";

export const RoleInfoValidation = () =>
  yup.object().shape({
    title: yup.string().required("This field is required"),
  });
