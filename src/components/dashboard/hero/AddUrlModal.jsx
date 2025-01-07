"use client";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { IoMdLink } from "react-icons/io";
import { Dialog, TextField } from "@mui/material";
import { enqueueSnackbar } from "notistack";

const isValidUrl = (url) => {
  try {
    new URL(url);
  } catch (e) {
    return false;
  }
  return true;
};

const AddUrlModal = ({ instance }) => {
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
      url: instance?.media_url || "",
    },

    validationSchema: yup.object().shape({
      url: yup
        .string()
        .test("is-url-valid", "URL is not valid", (value) => isValidUrl(value))
        .required("This field is required"),
    }),
    onSubmit: async (data) => {
      try {
        instance.media_url = data.url;
        setOpen(!open);
      } catch (error) {
        // toast.error("Something Went Wrong");
        // console.log(error);
        enqueueSnackbar(error?.message, { variant: "error" });
      }
    },
  });
  const [open, setOpen] = useState(false);
  return (
    <div>
      <span
        onClick={() => setOpen(!open)}
        className="p-1 flex rounded-full bg-white cursor-pointer"
      >
        <IoMdLink />
      </span>
      <Dialog
        className="p-5"
        open={open}
        maxWidth="sm"
        fullWidth
        onClose={() => setOpen(!open)}
      >
        <form
          noValidate
          className="border p-5"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            fullWidth
            size="medium"
            name="url"
            value={values.url}
            error={touched.url && Boolean(errors.url)}
            helperText={touched.url && errors.url}
            className="w-full mt-4"
            onChange={handleChange}
            label="Url"
          />
          <div className="flex gap-2 justify-end pb-5 mt-4">
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
              Ok
            </button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default AddUrlModal;
