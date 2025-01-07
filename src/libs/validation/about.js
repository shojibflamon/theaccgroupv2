import * as yup from "yup";

export const heroFormValidation = () =>
  yup.object().shape({
    about_details: yup.string().required("This field is required"),
    title: yup.string().max(16).required("This field is required"),
    image: yup.string().required("This field is required"),
  });

export const promoFormValidation = () =>
  yup.object().shape({
    first_card: yup.string().required("This field is required"),
    second_card: yup.string().required("This field is required"),
    third_card: yup.string().required("This field is required"),
    fourth_card: yup.string().required("This field is required"),
  });
