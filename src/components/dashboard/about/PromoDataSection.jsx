"use client";;
import { useFormik } from "formik";
import { useState } from "react";
import { promoFormValidation } from "../../../libs/validation/about";
import { TextField } from "@mui/material";
import { usePostLPromoData } from "@/hooks/about.hooks";

const PromoDataSection = ({ instance }) => {
  const [edit, setEdit] = useState(false);
  const { mutateAsync } = usePostLPromoData();
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
      section: "promo",
      first_card: instance?.first_card || "",
      second_card: instance?.second_card || "",
      third_card: instance?.third_card || "",
      fourth_card: instance?.fourth_card || "",
    },

    validationSchema: promoFormValidation,
    onSubmit: async (data) => {
      try {
        await mutateAsync(data);
        setEdit(!edit);
        enqueueSnackbar("Updated promo section data.", { variant: "success" });
        // resetForm();
      } catch (error) {
        // console.log(error);
        enqueueSnackbar(error?.message, { variant: "error" });
      }
    },
  });

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
      className="bg-[#F3F3F6] rounded-[20px] p-[20px] lg:p-[35px]"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-bold">Your Promo Data</h2>
        {edit ? (
          <div className="flex gap-3">
            <button
              onClick={() => setEdit(!edit)}
              className="btn border border-1 px-4 lg:px-7 py-[14px] capitalize inline-block  bg-white text-black rounded-[10px]"
            >
              Cancel
            </button>
            <button
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

      <p className="h-[0.5px] bg-[#050C2F] my-7"></p>

      <div className="grid grid-cols-2 gap-7">
        <TextField
          disabled={!edit}
          value={values.first_card}
          error={touched.first_card && Boolean(errors.first_card)}
          helperText={touched.first_card && errors.first_card}
          className="w-full "
          name="first_card"
          onChange={handleChange}
          label="First Card"
          // placeholder="Title"
        />
        <TextField
          disabled={!edit}
          value={values.second_card}
          error={touched.second_card && Boolean(errors.second_card)}
          helperText={touched.second_card && errors.second_card}
          className="w-full "
          name="second_card"
          onChange={handleChange}
          label="Second Card"
          // placeholder="Title"
        />
        <TextField
          disabled={!edit}
          value={values.third_card}
          error={touched.third_card && Boolean(errors.third_card)}
          helperText={touched.third_card && errors.third_card}
          className="w-full "
          name="third_card"
          onChange={handleChange}
          label="Third Card"
          // placeholder="Title"
        />
        <TextField
          disabled={!edit}
          value={values.fourth_card}
          error={touched.fourth_card && Boolean(errors.fourth_card)}
          helperText={touched.fourth_card && errors.fourth_card}
          className="w-full "
          name="fourth_card"
          onChange={handleChange}
          label="Fourth Card"
          // placeholder="Title"
        />
      </div>
    </form>
  );
};

export default PromoDataSection;
