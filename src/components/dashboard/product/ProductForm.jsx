"use client";
import { useGETColor } from "@/hooks/color.hooks";
import {
  useGETProductCategory,
  usePostProduct,
  useUpdateProduct,
} from "@/hooks/product.hook";
import React from "react";
import { useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import {
  Autocomplete,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useFormik } from "formik";

import Image from "next/legacy/image";

import { MdOutlineDeleteForever } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import { TbPhotoEdit } from "react-icons/tb";
import { useS3Upload } from "next-s3-upload";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import {
  prductInfoValidation,
  prductTechnicalSpecificationValidation,
} from "@/libs/validation/productValidation";

const TechnicalSpecificationInput = ({ value, setValue }) => {
  const [open, setOpen] = useState(false);
  const {
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    isSubmitting,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      title: "",
      details: "",
      sl: 0,
    },

    validationSchema: prductTechnicalSpecificationValidation,
    onSubmit: async (data) => {
      try {
        value.push(data);
        setValue(value);
        // console.log(data);
        resetForm();
        setOpen(!open);
      } catch (error) {
        // toast.error("Something Went Wrong");
        // console.log(error);
        enqueueSnackbar(error?.message, { variant: "error" });
      }
    },
  });
  return (
    <>
      <button
        type="button"
        className="items-center w-full   bg-[#2F7CE3] text-white border border-1 px-4 lg:px-7 py-[14px] capitalize rounded-[10px]  gap-2 disabled:bg-slate-400"
        onClick={() => setOpen(!open)}
      >
        <span>
          {" "}
          New Technical Specification <AddIcon />
        </span>
      </button>
      <Dialog
        open={open}
        onClose={() => setOpen(!open)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle className="text-black font-semibold text-[24px]">
          Technical Specification
        </DialogTitle>

        <form
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
          className="transition-all duration-200  "
        >
          <DialogContent>
            <TextField
              fullWidth
              size="small"
              name="title"
              value={values.title}
              error={touched.title && Boolean(errors.title)}
              helperText={touched.title && errors.title}
              className="w-full mt-4"
              onChange={handleChange}
              label="Title"
            />
            <TextField
              fullWidth
              size="small"
              name="sl"
              value={values.sl}
              error={touched.sl && Boolean(errors.sl)}
              helperText={touched.sl && errors.sl}
              className="w-full mt-4"
              onChange={handleChange}
              label="Sequence"
            />
            <TextField
              fullWidth
              size="small"
              multiline
              rows={10}
              name="details"
              value={values.details}
              error={touched.details && Boolean(errors.details)}
              helperText={touched.details && errors.details}
              className="w-full mt-4"
              onChange={handleChange}
              label="Details"
            />
          </DialogContent>

          <DialogActions>
            <div className="flex gap-2 justify-end pb-5">
              <button
                type="button"
                onClick={() => setOpen(!open)}
                className="btn border border-1 px-4 lg:px-7 py-[14px] capitalize inline-block  bg-white text-black rounded-[10px]"
              >
                Cancel
              </button>

              <button
                disabled={isSubmitting}
                type="submit"
                className="btn bg-[#2F7CE3] text-white border border-1 px-4 lg:px-7 py-[14px] inline-block capitalize rounded-[10px] disabled:bg-slate-400"
              >
                Save
              </button>
            </div>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

const SupportsInouts = ({ value, setValue }) => {
  const [open, setOpen] = useState(false);
  const {
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    isSubmitting,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      title: "",
      details: "",
      sl: "",
    },

    validationSchema: prductTechnicalSpecificationValidation,
    onSubmit: async (data) => {
      try {
        value.push(data);
        setValue(value);
        // console.log(data);
        resetForm();
        setOpen(!open);
      } catch (error) {
        // toast.error("Something Went Wrong");
        // console.log(error);
      }
    },
  });
  return (
    <>
      <button
        type="button"
        className="bg-[#2F7CE3] w-full text-white border border-1 px-4 lg:px-7 py-[14px] capitalize rounded-[10px]  items-center gap-2 disabled:bg-slate-400"
        onClick={() => setOpen(!open)}
      >
        New supports information
        <AddIcon />
      </button>
      <Dialog
        open={open}
        onClose={() => setOpen(!open)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle className="text-black font-semibold text-[24px]">
          Supports Information
        </DialogTitle>

        <form
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
          className="transition-all duration-200  "
        >
          <DialogContent>
            <TextField
              fullWidth
              size="small"
              name="title"
              value={values.title}
              error={touched.title && Boolean(errors.title)}
              helperText={touched.title && errors.title}
              className="w-full mt-4"
              onChange={handleChange}
              label="Title"
            />
            <TextField
              fullWidth
              size="small"
              name="sl"
              value={values.sl}
              error={touched.sl && Boolean(errors.sl)}
              helperText={touched.sl && errors.sl}
              className="w-full mt-4"
              onChange={handleChange}
              label="Sequence"
            />
            <TextField
              fullWidth
              size="small"
              multiline
              rows={10}
              name="details"
              value={values.details}
              error={touched.details && Boolean(errors.details)}
              helperText={touched.details && errors.details}
              className="w-full mt-4"
              onChange={handleChange}
              label="Details"
            />
          </DialogContent>

          <DialogActions>
            <div className="flex gap-2 justify-end pb-5">
              <button
                type="button"
                onClick={() => setOpen(!open)}
                className="btn border border-1 px-4 lg:px-7 py-[14px] capitalize inline-block  bg-white text-black rounded-[10px]"
              >
                Cancel
              </button>

              <button
                disabled={isSubmitting}
                type="submit"
                className="btn bg-[#2F7CE3] text-white border border-1 px-4 lg:px-7 py-[14px] inline-block capitalize rounded-[10px] disabled:bg-slate-400"
              >
                Add
              </button>
            </div>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

const UpdateFeatureInfo = ({ value, setValue, idx }) => {
  const [open, setOpen] = useState(false);
  const {
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    isSubmitting,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      title: value[idx]?.title || "",
      details: value[idx]?.details || "",
      sl: value[idx]?.sl || 0,
    },

    validationSchema: prductTechnicalSpecificationValidation,
    onSubmit: async (data) => {
      try {
        value[idx] = data;
        // value.push(data);
        setValue(value);
        // console.log(data);
        setOpen(!open);
      } catch (error) {
        // toast.error("Something Went Wrong");
        // console.log(error);
      }
    },
  });
  return (
    <>
      <button
        type="button"
        className="cursor-pointer text-lg"
        onClick={() => setOpen(!open)}
      >
        <MdEditSquare />
      </button>
      <Dialog
        open={open}
        onClose={() => setOpen(!open)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle className="text-black font-semibold text-[24px]">
          Edit Information
        </DialogTitle>

        <form
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
          className="transition-all duration-200  "
        >
          <DialogContent>
            <TextField
              fullWidth
              size="small"
              name="title"
              value={values.title}
              error={touched.title && Boolean(errors.title)}
              helperText={touched.title && errors.title}
              className="w-full mt-4"
              onChange={handleChange}
              label="Title"
            />
            <TextField
              fullWidth
              size="small"
              name="sl"
              value={values.sl}
              error={touched.sl && Boolean(errors.sl)}
              helperText={touched.sl && errors.sl}
              className="w-full mt-4"
              onChange={handleChange}
              label="Sequence"
            />
            <TextField
              fullWidth
              size="small"
              multiline
              rows={10}
              name="details"
              value={values.details}
              error={touched.details && Boolean(errors.details)}
              helperText={touched.details && errors.details}
              className="w-full mt-4"
              onChange={handleChange}
              label="Details"
            />
          </DialogContent>

          <DialogActions>
            <div className="flex gap-2 justify-end pb-5">
              <button
                type="button"
                onClick={() => setOpen(!open)}
                className="btn border border-1 px-4 lg:px-7 py-[14px] capitalize inline-block  bg-white text-black rounded-[10px]"
              >
                Cancel
              </button>

              <button
                disabled={isSubmitting}
                type="submit"
                className="btn bg-[#2F7CE3] text-white border border-1 px-4 lg:px-7 py-[14px] inline-block capitalize rounded-[10px] disabled:bg-slate-400"
              >
                Edit
              </button>
            </div>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

const DeleteInfoRow = ({ value = [], idx, setValue }) => {
  const handleDelet = () => {
    value.splice(idx, 1);
    setValue(value);
  };
  return (
    <>
      <button
        type="button"
        onClick={handleDelet}
        className="text-xl text-red-500"
      >
        <MdOutlineDeleteForever />
      </button>
    </>
  );
};

const UpdateImage = ({ value, setValue, idx }) => {
  let { uploadToS3 } = useS3Upload();

  const handleImageUpload = async (e, uploadToS3) => {
    try {
      if (e.target.files[0].size > 1000000) {
        alert("Image size slould be maximum 1MB");
      } else {
        // const img = await getImgToB64(e.target.files[0]);

        const x = await uploadToS3(e.target.files[0], {
          endpoint: {
            request: {
              url: `/api/s3-upload/?dir=product/gallery`,
              body: {
                dir: "product/gallery",
              },
            },
          },
        });

        value[idx] = x?.url;

        setValue(value);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="cursor-pointer bg-white  border border-blue-400 p-1 rounded-full absolute right-[-5px] top-[28px]">
        <label htmlFor={`file_input_${idx}`}>
          <TbPhotoEdit className="text-blue-400 cursor-pointer" />
        </label>
        <input
          className="hidden"
          id={`file_input_${idx}`}
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, uploadToS3)}
        />
      </div>
    </>
  );
};

// default component
const ProductForm = ({ instance }) => {
  const [open, setOpen] = useState(false);
  const { data: productCategory } = useGETProductCategory();
  const { data: colorData } = useGETColor();
  const { mutateAsync } = usePostProduct();
  const { mutateAsync: upDateInfo } = useUpdateProduct(instance?.id);
  const { push } = useRouter();
  let { uploadToS3 } = useS3Upload();

  const {
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    isSubmitting,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      title: instance?.title || "",
      deccription: instance?.deccription || "",
      price: instance?.price || "",
      model: instance?.model || "",
      slug: instance?.slug || "",
      features: instance?.features || "",
      categoryId: instance?.categoryId || "",
      color_varients: instance?.ProductColor.map((i) => i.color) || [],
      technical_specification: instance?.technical_specification || [],
      supports: instance?.supports || [],
      images: instance?.images || [],
      thumbnail: instance?.thumbnail || "",
      weight_value: instance?.weight_value || 0,
    },

    validationSchema: prductInfoValidation,
    onSubmit: async (data) => {
      try {
        data.slug = data.slug.trim();
        data.isActive = true;
        if (instance) {
          await upDateInfo(data);
          push("/dashboard/product");
          // window.location.reload(false);
          enqueueSnackbar("Product updated successfully.", {
            variant: "success",
          });
        } else {
          data.isActive = true;
          await mutateAsync(data);
          push("/dashboard/product");
          // window.location.reload(false);
          enqueueSnackbar("Successfully added new product.", {
            variant: "success",
          });
        }
        // resetForm();
      } catch (error) {
        enqueueSnackbar(error?.message, { variant: "error" });
      }
    },
  });
  const handleImageGalery = async (e) => {
    try {
      if (e.target.files[0].size > 1000000) {
        alert("Image size slould be maximum 1MB");
      } else {
        // const img = await getImgToB64(e.target.files[0]);
        const x = await uploadToS3(e.target.files[0], {
          endpoint: {
            request: {
              url: `/api/s3-upload/?dir=product/gallery`,
              body: {
                dir: "product/gallery",
              },
            },
          },
        });
        setFieldValue("images", [...values.images, x?.url]);
      }
    } catch (error) {}
  };

  const handleThumbnailImage = async (e) => {
    try {
      if (e.target.files[0].size > 1000000) {
        alert("Image size slould be maximum 1MB");
      } else {
        // const img = await getImgToB64(e.target.files[0]);
        const x = await uploadToS3(e.target.files[0], {
          endpoint: {
            request: {
              url: `/api/s3-upload/?dir=product/thumbnail`,
              body: {
                dir: "product/thumbnail",
              },
            },
          },
        });
        setFieldValue("thumbnail", x?.url);
      }
    } catch (error) {}
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
        className="transition-all duration-200  "
      >
        <DialogContent>
          <div className="p-7 space-y-7 bg-[#F3F3F6] rounded-3xl">
            <p className="text-4xl font-bold">Product Description</p>
            <div className="grid gap-7 md:grid-cols-2">
              <TextField
                fullWidth
                size="small"
                name="title"
                value={values.title}
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && errors.title}
                className="w-full"
                onChange={handleChange}
                label="Product Name"
              />

              <div className="grid grid-cols-2 gap-7">
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  name="price"
                  value={values.price}
                  error={touched.price && Boolean(errors.price)}
                  helperText={touched.price && errors.price}
                  className="w-full"
                  onChange={handleChange}
                  label="Price"
                />
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  name="weight_value"
                  value={values.weight_value}
                  error={touched.weight_value && Boolean(errors.weight_value)}
                  helperText={touched.weight_value && errors.weight_value}
                  className="w-full"
                  onChange={handleChange}
                  label="Sequence Num"
                />
              </div>
            </div>
            <div>
              {colorData && (
                <Autocomplete
                  multiple
                  value={values.color_varients}
                  id="tags-outlined"
                  options={colorData}
                  getOptionLabel={(option) => option.title}
                  filterSelectedOptions
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  onChange={(e, value) => {
                    setFieldValue("color_varients", value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Color"
                      placeholder="Color"
                    />
                  )}
                />
              )}
            </div>

            <div className="grid gap-7 md:grid-cols-2">
              <TextField
                fullWidth
                size="small"
                name="slug"
                value={values.slug}
                error={touched.slug && Boolean(errors.slug)}
                helperText={touched.slug && errors.slug}
                className="w-full"
                onChange={handleChange}
                label="Slug"
              />
              <div className="grid gap-7 md:grid-cols-2">
                <TextField
                  fullWidth
                  size="small"
                  name="model"
                  value={values.model}
                  error={touched.model && Boolean(errors.model)}
                  helperText={touched.model && errors.model}
                  className="w-full"
                  onChange={handleChange}
                  label="Model"
                />
                <FormControl
                  fullWidth
                  size="small"
                  className="w-full"
                  error={touched.categoryId && Boolean(errors.categoryId)}
                >
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="categoryId"
                    value={values.categoryId}
                    label="Category"
                    onChange={handleChange}
                  >
                    <MenuItem value={""}>Select Category</MenuItem>
                    {productCategory &&
                      productCategory.map((i) => (
                        <MenuItem key={i.id} value={i.id}>
                          {i.title}
                        </MenuItem>
                      ))}
                  </Select>
                  <FormHelperText>
                    {touched.categoryId && errors.categoryId}
                  </FormHelperText>
                </FormControl>
              </div>
            </div>

            <TextField
              fullWidth
              size="small"
              multiline
              rows={10}
              name="deccription"
              value={values.deccription}
              error={touched.deccription && Boolean(errors.deccription)}
              helperText={touched.deccription && errors.deccription}
              className="w-full mt-4"
              onChange={handleChange}
              label="Deccription"
            />
          </div>
          <br /> <br />
          <div className="p-7 bg-[#F3F3F6] rounded-3xl">
            <p className="text-4xl font-bold">Product Description</p>
            <p className="text-[28px] font-bold mt-14">Feature Details</p>
            <hr />
            <TextField
              fullWidth
              size="small"
              multiline
              rows={10}
              name="features"
              value={values.features}
              error={touched.features && Boolean(errors.features)}
              helperText={touched.features && errors.features}
              className="w-full mt-4"
              onChange={handleChange}
              label="features"
            />
            <p className="h-[0.5px] bg-[#050C2F] my-12"></p>
            <p className="text-[28px] font-bold mb-5">
              Technical Specifications
            </p>
            <hr />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Sequence
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Key Feature
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Details
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {values.technical_specification
                    .sort((a, b) => b.sl - a.sl)
                    .map((i, idx) => (
                      <tr
                        key={idx}
                        className="odd:bg-white  even:bg-gray-50  border-b "
                      >
                        <td className="px-6 py-4">{i.sl}</td>
                        <td className="px-6 py-4">{i.title}</td>
                        <td className="px-6 py-4">{i.details}</td>
                        <td className="px-6 py-4">
                          <DeleteInfoRow
                            value={values.technical_specification}
                            idx={idx}
                            setValue={(x) =>
                              setFieldValue("technical_specification", x)
                            }
                          />

                          <UpdateFeatureInfo
                            value={values.technical_specification}
                            idx={idx}
                            setValue={(x) =>
                              setFieldValue("technical_specification", x)
                            }
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <br />
            <TechnicalSpecificationInput
              value={values.technical_specification}
              setValue={(x) => setFieldValue("technical_specification", x)}
            />
            <p className="h-[0.5px] bg-[#050C2F] my-12"></p>
            <p className="text-[28px] font-bold mb-5">Supports Information</p>
            <hr />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      SEQUENCE
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Key Feature
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Details
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {values.supports
                    .sort((a, b) => b.sl - a.sl)
                    .map((i, idx) => (
                      <tr
                        key={idx}
                        className="odd:bg-white  even:bg-gray-50  border-b "
                      >
                        <td className="px-6 py-4">{i.sl}</td>
                        <td className="px-6 py-4">{i.title}</td>
                        <td className="px-6 py-4">{i.details}</td>
                        <td className="px-6 py-4">
                          <DeleteInfoRow
                            value={values.supports}
                            idx={idx}
                            setValue={(x) => setFieldValue("supports", x)}
                          />
                          <UpdateFeatureInfo
                            value={values.supports}
                            idx={idx}
                            setValue={(x) => setFieldValue("supports", x)}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <br />
            <SupportsInouts
              value={values.supports}
              setValue={(x) => setFieldValue("supports", x)}
            />
            <p className="h-[0.5px] bg-[#050C2F] my-12"></p>
            <>
              <div className="flex justify-between">
                <div>
                  <p className="text-[28px] font-bold mb-5" htmlFor="">
                    Image Gallery
                  </p>

                  <div className="my-5">
                    <p>
                      {" "}
                      Share your product image. Image should be PNG and maximum
                      size 1 Mb
                    </p>
                    <p className="text-sm">
                      Image Dimension:{" "}
                      <span className="text-[#2F7CE3]">314px 314px</span>
                    </p>

                    <p className="text-sm text-red-400">
                      {touched.images && errors.images}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    {values.images.map((i, idx) => (
                      <div key={idx} className="relative">
                        <Image width={92} height={92} src={i} alt="" />
                        <span
                          className="cursor-pointer bg-white text-[#BD2626] border border-[#BD2626] px-2 rounded-full absolute right-[-3px] top-[-2px]"
                          onClick={() => {
                            values.images.splice(idx, 1);
                            setFieldValue("images", values.images);
                          }}
                        >
                          x
                        </span>

                        <UpdateImage
                          value={values.images}
                          idx={idx}
                          setValue={(x) => setFieldValue("images", x)}
                        />
                      </div>
                    ))}
                    {values.images.length < 5 && (
                      <div>
                        <label htmlFor="file_input" className="items-center">
                          {/* sdsad */}
                          <span className="font-medium w-fit flex items-center p-8 border  bg-[#E4E4E4]">
                            <AddPhotoAlternateIcon className="text-blue-400" />
                          </span>
                        </label>
                        <input
                          className="hidden"
                          id="file_input"
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageGalery(e, uploadToS3)}
                        />
                      </div>
                    )}
                  </div>
                </div>
                {/* cover image */}
                <div className="">
                  {values.thumbnail ? (
                    <div className="relative">
                      <Image
                        width={237}
                        height={237}
                        src={values.thumbnail}
                        alt=""
                      />
                      <div className="cursor-pointer bg-white  border border-blue-400 p-2 rounded-full absolute right-[-3px] top-[-3px]">
                        <label htmlFor={`thumbnail${2}`}>
                          <TbPhotoEdit className="text-blue-400 cursor-pointer text-2xl" />
                        </label>
                        <input
                          className="hidden"
                          id={`thumbnail${2}`}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleThumbnailImage(e, uploadToS3)}
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label htmlFor="thumbnail" className="">
                        {/* sdsad */}
                        <span className="font-medium flex items-center h-[237px] w-[237px] border  bg-[#E4E4E4] ">
                          <div className="mx-auto text-center">
                            <AddPhotoAlternateIcon className="text-4xl " />
                            <br />
                            <span>Add Thumbnail</span>
                          </div>
                        </span>
                      </label>
                      <input
                        className="hidden"
                        id="thumbnail"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleThumbnailImage(e, uploadToS3)}
                      />
                      <p className="text-sm text-red-400">
                        {touched.thumbnail && errors.thumbnail}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </>
          </div>
        </DialogContent>

        <div className="flex justify-end gap-5 pb-5 mr-5">
          <button
            type="button"
            onClick={() => push("/dashboard/product")}
            className="btn border border-1 px-4 lg:px-7 py-[14px] capitalize inline-block  bg-white text-black rounded-[10px]"
          >
            Cancel
          </button>

          <button
            disabled={isSubmitting}
            type="submit"
            className="btn bg-[#2F7CE3] text-white border border-1 px-4 lg:px-7 py-[14px] inline-block capitalize rounded-[10px] disabled:bg-slate-400"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
