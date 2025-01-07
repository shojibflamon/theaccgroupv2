"use client";
import { useGETProfileData, useUpdateUser } from "@/hooks/user.hooks";
import { ProfileInfoValidation } from "@/libs/validation/userFormValidation";

import { useFormik } from "formik";
import React from "react";
import { useState } from "react";
import { useS3Upload } from "next-s3-upload";
import { enqueueSnackbar } from "notistack";
import Image from "next/legacy/image";
import { FiEdit3 } from "react-icons/fi";
import { TextField } from "@mui/material";
import ChangePasswordModal from "./ChangePassModal";
// import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const ProfileForm = ({ instance }) => {
  const { mutateAsync: updateInfo } = useUpdateUser(instance?.id);

  const [edit, setEdit] = useState(false);
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
      avater: instance?.avater || "",
      name: instance?.name || "",
      username: instance?.username || "",
      phone: instance?.phone || "",
    },

    validationSchema: ProfileInfoValidation,
    onSubmit: async (data) => {
      try {
        await updateInfo(data);
        enqueueSnackbar("Updated profile.", { variant: "success" });
        setEdit(!edit);
      } catch (error) {
        // console.log(error);
        enqueueSnackbar(error?.message, { variant: "error" });
      }
    },
  });

  let { uploadToS3 } = useS3Upload();

  const handleImage = async (e, uploadToS3) => {
    try {
      if (e.target.files[0].size > 1000000) {
        alert("Image size slould be maximum 1MB");
      } else {
        // const img = await getImgToB64(e.target.files[0]);
        const img = await uploadToS3(e.target.files[0], {
          endpoint: {
            request: {
              url: `/api/s3-upload/?dir=user`,
              body: {
                dir: "user",
              },
            },
          },
        });
        // console.log(img)
        setFieldValue("avater", img?.url);
      }
    } catch (error) {
      // console.log(error);
      enqueueSnackbar("Invalid!", { variant: "error" });
    }
  };

  // console.log(errors)
  return (
    <div className="p-12 pt-16 max-w-[600px] mx-auto rounded-[40px] bg-[#FAFAFA] relative">
      <form
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
        className="transition-all duration-200  "
      >
        <div className="space-y-10">
          <h3 className="text-center text-[32px] font-semibold">
            Update Profile
          </h3>
          <div className="w-[150px] h-[150px] rounded-full mx-auto relative bg-[#D9D9D9]">
            {values?.avater && (
              <Image
                className="rounded-full"
                src={values.avater}
                layout="fill"
                objectFit="cover"
                alt="about-image"
              />
            )}
            {edit && (
              <label htmlFor="up_profile_image">
                <span className="absolute p-2 rounded-full bg-[#E8ECF9] bottom-0 right-0">
                  <FiEdit3 />
                </span>
                <input
                  id="up_profile_image"
                  disabled={!edit}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImage(e, uploadToS3)}
                  name="image"
                  className="hidden"
                ></input>
              </label>
            )}
          </div>
          <div className="space-y-5">
            <TextField
              disabled={!edit}
              fullWidth
              size="medium"
              name="name"
              value={values.name}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
              className="w-full"
              onChange={handleChange}
              label="Name"
            />
            <TextField
              fullWidth
              disabled={!edit}
              size="medium"
              name="username"
              value={values.username}
              error={touched.username && Boolean(errors.username)}
              helperText={touched.username && errors.username}
              className="w-full"
              onChange={handleChange}
              label="User Name"
            />
            <TextField
              fullWidth
              disabled={!edit}
              size="medium"
              name="phone"
              value={values.phone}
              error={touched.phone && Boolean(errors.phone)}
              helperText={touched.phone && errors.phone}
              className="w-full"
              onChange={handleChange}
              label="Phone Number"
            />
          </div>
        </div>

        <div className="mt-5">
          {edit ? (
            <div>
              <button
                disabled={isSubmitting}
                type="submit"
                className="btn bg-[#2F7CE3] w-full text-white border border-1 px-4 lg:px-7 py-[14px] inline-block capitalize rounded-[10px] disabled:bg-slate-400"
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setEdit(!edit)}
              className="btn bg-[#E4E4E4] w-full
               px-4 lg:px-7 py-[14px] inline-block capitalize rounded-[10px] 
               "
            >
              Edit
            </button>
          )}
        </div>
      </form>
      <div className="absolute right-3 top-3">
        <ChangePasswordModal instance={instance} />
      </div>
    </div>
  );
};

const ProfileContainer = () => {
  const { data: profileData, isLoading } = useGETProfileData();
  return <div>{profileData && <ProfileForm instance={profileData} />}</div>;
};

export default ProfileContainer;
