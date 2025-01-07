import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useFormik } from "formik";

import { FiEdit } from "react-icons/fi";

import { productCategory } from "../../../libs/validation/productValidation";
import {
  usePostProductCategory,
  useUpdateProductCategory,
} from "../../../hooks/product.hook";

const CategoryModal = ({ instance }) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync } = usePostProductCategory();
  const { mutateAsync: handleUpdateInfo } = useUpdateProductCategory(
    instance?.id
  );

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
      weight_value: instance?.weight_value || "",
    },

    validationSchema: productCategory,
    onSubmit: async (data) => {
      try {
        if (instance) {
          await handleUpdateInfo(data);
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
          onClick={() => setOpen(!open)}
        >
          Add Category
          <AddIcon />
        </button>
      )}

      <Dialog
        open={open}
        onClose={() => setOpen(!open)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle className="text-black font-semibold text-[24px]">
          Add Category
        </DialogTitle>

        <form
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
          className="transition-all duration-200  "
        >
          <DialogContent>
            <div className="w-full space-y-5 mt-[-20px]">
              <TextField
                size="medium"
                name="title"
                value={values.title}
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && errors.title}
                className="w-full mt-4"
                onChange={handleChange}
                label="Category Name"
              />
              <TextField
                fullWidth
                size="medium"
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
          </DialogContent>

          <DialogActions>
            <div className="flex justify-end gap-5 pb-5 pr-4 mt-1">
              <button
                type="button"
                onClick={() => setOpen(!open)}
                className="btn border border-1 px-4 lg:px-7 py-[14px] capitalize inline-block bg-white text-black rounded-[10px]"
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
  );
};

export default CategoryModal;
