import * as yup from "yup";

export const productCategory = () =>
  yup.object().shape({
    title: yup.string().required("This field is required"),
    weight_value: yup.number().required("This field is required"),
  });

export const prductInfoValidation = () =>
  yup.object().shape({
    title: yup.string().required("This field is required"),
    slug: yup.string().required("This field is required"),
    deccription: yup.string().required("This field is required"),
    price: yup.number().required("This field is required"),
    weight_value: yup.number().required("This field is required"),
    model: yup.string().required("This field is required"),
    categoryId: yup.string().required("This field is required"),
    images: yup.array().min(1).max(4).required("This field is required"),
    thumbnail: yup.string().required("This field is required")
  });

export const prductTechnicalSpecificationValidation = () =>
  yup.object().shape({
    title: yup.string().required("This field is required"),
    details: yup.string().required("This field is required"),
    sl: yup.number().required("This field is required"),
  });
