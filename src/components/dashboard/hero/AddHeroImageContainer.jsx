"use client";
import React, { useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useFormik } from "formik";
import { enqueueSnackbar } from "notistack";
import { useS3Upload } from "next-s3-upload";
import { Reorder } from "framer-motion";
import Image from "next/legacy/image";

import AddUrlModal from "./AddUrlModal";
import { usePostLandingHeroSection } from "@/hooks/landing.hooks";

const AddHeroImageContainer = ({ instance }) => {
  const { mutateAsync } = usePostLandingHeroSection();
  const [preview, setPreview] = useState({
    id: 1,
    img: instance?.thumbnail?.[0]?.url,
  });
  // console.log(preview)
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
      page: "landing",
      section: "hero",
      thumbnail: instance?.thumbnail || [],
    },

    // validationSchema: landingFormValidation,
    onSubmit: async (data) => {
      try {
        await mutateAsync(data);
        // setOpen(!open);
        enqueueSnackbar("Updated Successfully", { variant: "success" });
        // resetForm();
      } catch (error) {
        // console.log(error);
        enqueueSnackbar(error?.message, { variant: "error" });
      }
    },
  });

  let { uploadToS3 } = useS3Upload();

  const handleImage = async (e) => {
    try {
      if (e.target.files[0].size > 1000000) {
        alert("Image size slould be maximum 1MB");
      } else {
        // const img = await getImgToB64(e.target.files[0]);
        const img = await uploadToS3(e.target.files[0], {
          endpoint: {
            request: {
              url: `/api/s3-upload/?dir=hero`,
              body: {
                dir: "hero",
              },
            },
          },
        });

        const _ = {
          _sl: values.thumbnail.length + 1,
          url: img?.url,
        };
        setFieldValue("thumbnail", [...values.thumbnail, _]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(values.thumbnail)
  return (
    <div>
      <div>
        <form
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
          className="overflow-hidden transition-all duration-200  p-2 lg:flex-row gap-10 lg:py-[30px]"
        >
          <div className="flex flex-col lg:flex-row gap-4 mb-[30px] lg:items-center">
            <div className="">
              <div className="rounded-3xl">
                <div className=" border-2  bg-[#E4E4E4] px-[30px] py-[12px] rounded-[10px]">
                  <label className=" ">
                    <span className=" items-center ">
                      <h1 className="font-medium text-[20px] flex items-center">
                        <AddPhotoAlternateIcon className="mr-2" /> Add Photo
                      </h1>
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImage(e)}
                      name="thumbnail"
                      className="hidden"
                    ></input>
                  </label>
                  {touched.thumbnail && Boolean(errors.thumbnail) && (
                    <p className="text-red-600 text-sm" role="alert">
                      {touched.thumbnail && errors.thumbnail}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Show Preview */}

          {values.thumbnail && (
            <>
              <div>
                {/* <h1 className="text-[24px] font-medium">Show Preview</h1> */}
                <Reorder.Group
                  axis="x"
                  values={values.thumbnail}
                  onReorder={(e) => setFieldValue("thumbnail", e)}
                >
                  <div className="flex space-x-4 overflow-x-auto pb-5">
                    {values.thumbnail.map((i, idx) => (
                      <Reorder.Item key={i._sl} value={i}>
                        <div
                          onClick={() =>
                            setPreview({ id: idx + 1, img: i.url })
                          }
                          style={{ backgroundImage: `url(${i.url})` }}
                          className={`${
                            idx + 1 == preview.id ? " border-[#2F7CE3]" : ""
                          } relative border rounded-xl bg-cover bg-center bg-no-repeat w-[120px] h-[70px] xl:w-[190px] xl:h-[120px] 2xl:w-[230px] 2xl:h-[140px]`}
                        >
                          <div
                            style={{ backgroundImage: `url(${i?.url})` }}
                            className="bg-cover bg-center bg-no-repeat w-[120px] h-[70px]"
                          ></div>
                          <span
                            className="cursor-pointer bg-white text-[#BD2626] border border-[#BD2626] px-2 rounded-full absolute right-[-3px] top-0"
                            onClick={() => {
                              values.thumbnail.splice(idx, 1);
                              setFieldValue("thumbnail", values.thumbnail);
                            }}
                          >
                            x
                          </span>
                          <div className="absolute right-[-3px] top-8">
                            <AddUrlModal instance={i} />
                          </div>
                        </div>
                      </Reorder.Item>
                    ))}
                  </div>
                </Reorder.Group>

                <p className="my-7 text-xl">Show Preview</p>
                <div>
                  {preview?.img && (
                    <Image
                      className="rounded-xl"
                      src={preview.img}
                      height={435}
                      width={1000}
                      layout="responsive"
                      objectFit="cover"
                      alt="preview-img"
                    />
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  // loading={true}
                  disabled={isSubmitting}
                  type="submit"
                  className="btn bg-[#2F7CE3] text-white px-4 lg:px-7 py-[10px] capitalize mt-[20px]  ml-[22px] rounded-[10px] disabled:bg-slate-400"
                >
                  {isSubmitting ? "Saving..." : "Publish"}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddHeroImageContainer;
