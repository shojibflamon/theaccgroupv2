"use client";
import { TextField } from "@mui/material";
import { useS3Upload } from "next-s3-upload";
import Image from "next/legacy/image";
import { useState } from "react";
import { heroFormValidation } from "../../../libs/validation/about";

import { UploadImgIcon } from "../../../components/core/icons/DashboardIcons";
import { useFormik } from "formik";
import dynamic from "next/dynamic";
import { QUILLS_FORMAT, QUILL_MODULES } from "@/libs/quillEditorOptions";
import { usePostLAboutSection } from "@/hooks/about.hooks";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export const HeadTextFiled = ({
  values,
  touched,
  errors,
  handleChange,
  edit,
}) => {
  return (
    <div>
      <TextField
        disabled={!edit}
        value={values.title}
        error={touched.title && Boolean(errors.title)}
        helperText={touched.title && errors.title}
        className="w-full "
        name="title"
        onChange={handleChange}
        label="Title (Maximum 16 characters)"
        placeholder="Title"
      />
    </div>
  );
};

export const AboutDetailsTextFiled = ({
  edit,
  values,
  setValue,
  errors,
  touched,
}) => {
  return (
    <div>
      <ReactQuill
        readOnly={!edit}
        required
        className="h-56 mb-12"
        theme="snow"
        modules={QUILL_MODULES}
        formats={QUILLS_FORMAT}
        error={touched.about_details && Boolean(errors.about_details)}
        value={values?.about_details}
        name="about_details"
        onChange={(e) => {
          setValue(e);
          // setFieldValue("description", e)
        }}
      />
      <p className="text-red-400 text-sm">{touched.title && errors.title}</p>
    </div>
  );
};

//   default component
const AboutDetails = ({ instance }) => {
  const [edit, setEdit] = useState(false);
  const { mutateAsync } = usePostLAboutSection();

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
      page: "about",
      section: "hero",
      about_details: instance?.about_details || "",
      title: instance?.title || "",
      image: instance?.image || "",
    },

    validationSchema: heroFormValidation,
    onSubmit: async (data) => {
      try {
        await mutateAsync(data);

        enqueueSnackbar("Updated about data.", { variant: "success" });
        setEdit(!edit);
        // resetForm();
      } catch (error) {
        // console.log(error);
        enqueueSnackbar(error?.message, { variant: "error" });
      }
    },
  });

  const { uploadToS3 } = useS3Upload();

  const handleImage = async (e, uploadToS3) => {
    try {
      if (e.target.files[0].size > 1000000) {
        alert("Image size slould be maximum 1MB");
      } else {
        // const img = await getImgToB64(e.target.files[0]);
        const img = await uploadToS3(e.target.files[0], {
          endpoint: {
            url: `/api/s3-upload/?dir=about`,
            request: {
              body: {
                dir: "about",
              },
            },
          },
        });
        // console.log(img)
        setFieldValue("image", img.url);
      }
    } catch (error) {
      // console.log(error);
      enqueueSnackbar("Invalid!", { variant: "error" });
    }
  };

  // console.log(values.image)

  return (
    <div className="bg-[#F3F3F6] rounded-[20px] p-[20px] lg:p-[35px]">
      <form
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
        className="overflow-hidden transition-all duration-200  p-2 lg:flex-row gap-10"
      >
        <div className="flex justify-between items-center mb-2">
          <h1 className="font-bold text-[24px] lg:text-[36px]">Add About</h1>

          <div className="flex items-center">
            {edit ? (
              <div className="flex  gap-3">
                <button
                  onClick={() => setEdit(!edit)}
                  className="btn border border-1 px-4 lg:px-7 py-[14px] capitalize inline-block  bg-white text-black rounded-[10px]"
                >
                  Cancel
                </button>
                <button
                  // loading={true}
                  disabled={isSubmitting}
                  type="submit"
                  className="btn bg-[#2F7CE3] text-white border border-1 px-4 lg:px-7 py-[14px] inline-block capitalize rounded-[10px] disabled:bg-slate-400"
                >
                  {isSubmitting ? "Saving..." : "Publish Now"}
                </button>
              </div>
            ) : (
              <button
                onClick={() => setEdit(!edit)}
                className="btn bg-[#E4E4E4] text-[#050C2F] border border-1 px-4 lg:px-7 py-[14px]  inline-block capitalize rounded-[10px]"
              >
                Edit
              </button>
            )}
          </div>
        </div>
        {/* Add Image Section */}

        <div>
          <div className="mb-[30px] flex flex-col gap-7">
            <div>
              <HeadTextFiled
                edit={edit}
                values={values}
                errors={errors}
                handleChange={handleChange}
                touched={touched}
              />
            </div>
            <div className="">
              <h5 className="mb-3">Write your description here</h5>
              <AboutDetailsTextFiled
                edit={edit}
                values={values}
                errors={errors}
                setValue={(e) => setFieldValue("about_details", e)}
                touched={touched}
                handleChange={handleChange}
              />
            </div>
            <div className="p-7 rounded-md  border border-slate-400 flex items-center justify-between">
              <div className="flex gap-5 items-center">
                <div className="bg-slate-200 w-28 h-28 relative rounded-md">
                  {values?.image && (
                    <Image
                      className="rounded-md"
                      src={values.image}
                      layout="fill"
                      objectFit="cover"
                      alt="about-image"
                    />
                  )}
                </div>
                <div className="space-y-3.5">
                  <h5 className="text-lg font-semibold">
                    Upload your image not more than{" "}
                    <span className="text-[#2F7CE3]">1Mb</span>
                  </h5>
                  <p className="text-sm">
                    Image Dimension{" "}
                    <span className="text-[#2F7CE3]">464px 383px</span>
                  </p>
                </div>
              </div>
              <div>
                <label
                  className="px-8 py-[18px] rounded-[200px] border border-[#2F7CE3] text-[#2F7CE3] flex items-center gap-2.5"
                  htmlFor="up_image"
                >
                  <UploadImgIcon /> Browse
                  <input
                    id="up_image"
                    disabled={!edit}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImage(e, uploadToS3)}
                    name="image"
                    className="hidden"
                  ></input>
                </label>
                {errors.image && (
                  <p className="text-red-600 mt-2">
                    {touched.title && errors.title}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Show Preview */}
      </form>
    </div>
  );
};
export default AboutDetails;
