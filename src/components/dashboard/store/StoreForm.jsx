"use client";
import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import AddIcon from "@mui/icons-material/Add";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { enqueueSnackbar } from "notistack";
import { StoreInfoValidation } from "@/libs/validation/storeValidation";
import { usePostStore, useUpdateStore } from "@/hooks/store.hooks";

const StoreForm = ({ instance }) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync } = usePostStore();
  const { mutateAsync: updateInfo } = useUpdateStore(instance?.id);
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
      outlet: instance?.outlet || "",
      number: instance?.number || "",
      email: instance?.email || "",
      address: instance?.address || "",
    },

    validationSchema: StoreInfoValidation,
    onSubmit: async (data) => {
      try {
        // console.log(data);
        if (instance) {
          data.id = instance?.id;
          await updateInfo(data);
          enqueueSnackbar("Updated store.", { variant: "success" });
        } else {
          await mutateAsync(data);
          resetForm();
          enqueueSnackbar("Added new store.", { variant: "success" });
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
          Add Store
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
            {instance ? "Edit Store" : "Add Store"}
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
                  name="outlet"
                  value={values.outlet}
                  error={touched.outlet && Boolean(errors.outlet)}
                  helperText={touched.outlet && errors.outlet}
                  className="w-full mt-4"
                  onChange={handleChange}
                  label="Store Name"
                />
                <TextField
                  fullWidth
                  size="small"
                  name="number"
                  value={values.number}
                  error={touched.number && Boolean(errors.number)}
                  helperText={touched.number && errors.number}
                  className="w-full mt-4"
                  onChange={handleChange}
                  label="Contact Number"
                />
                <TextField
                  fullWidth
                  size="small"
                  name="email"
                  value={values.email}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  className="w-full mt-4"
                  onChange={handleChange}
                  label="Email"
                />
                <TextField
                  fullWidth
                  size="small"
                  name="address"
                  multiline
                  rows={4}
                  value={values.address}
                  error={touched.address && Boolean(errors.address)}
                  helperText={touched.address && errors.address}
                  className="w-full mt-4"
                  onChange={handleChange}
                  label="Adress"
                />
              </div>
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

export default StoreForm;
