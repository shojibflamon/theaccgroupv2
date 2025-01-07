import { usePostColor, useUpdateColor } from "@/hooks/color.hooks";
import { ColorInfoValidation } from "@/libs/validation/colorValidation";
import { useFormik } from "formik";
import React from "react";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

const ColorForm = ({ instance }) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync } = usePostColor();
  const { mutateAsync: updateInfo } = useUpdateColor(instance?.id);
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
      hax_code: instance?.hax_code || "",
    },

    validationSchema: ColorInfoValidation,
    onSubmit: async (data) => {
      try {
        if (instance) {
          data.id = instance?.id;
          await updateInfo(data);
        } else {
          await mutateAsync(data);
          resetForm();
        }

        setOpen(!open);
      } catch (error) {
        // toast.error("Something Went Wrong");
        // console.log(error);
        enqueueSnackbar(error?.message, { variant: "error" });
      }
    },
  });
  return (
    <div>
      {instance ? (
        <FiEdit
          className="text-black cursor-pointer"
          size={20}
          onClick={() => setOpen(!open)}
        />
      ) : (
        <button
          className="btn bg-[#2F7CE3] text-white border border-1 px-4 lg:px-7 py-[14px] capitalize rounded-[10px] flex items-center gap-2 disabled:bg-slate-400"
          variant="outlined"
          onClick={() => {
            setOpen(!open);
            resetForm();
          }}
        >
          Add Color
          <AddIcon />
        </button>
      )}
      <div>
        <Dialog
          open={open}
          onClose={() => setOpen(!open)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle className="text-black font-semibold text-[24px]">
            {instance ? "Edit Color" : "Add Color"}
          </DialogTitle>

          <form
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
            className="transition-all duration-200  "
          >
            <DialogContent>
              <div className="space-y-5">
                <TextField
                  fullWidth
                  size="small"
                  name="title"
                  value={values.title}
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                  className="w-full mt-4"
                  onChange={handleChange}
                  label="Color Name"
                />
                <TextField
                  fullWidth
                  size="small"
                  name="hax_code"
                  value={values.hax_code}
                  error={touched.hax_code && Boolean(errors.hax_code)}
                  helperText={touched.hax_code && errors.hax_code}
                  className="w-full mt-4"
                  onChange={handleChange}
                  label="Color Code(hax_code)"
                />
              </div>
            </DialogContent>

            <DialogActions>
              <div className="flex gap-2 justify-end pb-5 mr-4">
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
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
              </div>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </div>
  );
};

export default ColorForm;
