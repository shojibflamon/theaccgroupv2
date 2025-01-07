import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useFormik } from "formik";

import { UserResetPassInfoValidation } from "@/libs/validation/userFormValidation";
import { useUpdateUser } from "@/hooks/user.hooks";
import { enqueueSnackbar } from "notistack";

const UserPassChangeModal = ({ instance }) => {
  const [open, setOpen] = useState(false);
  // const { mutateAsync } = usePostProductCategory();
  const { mutateAsync: updateInfo } = useUpdateUser(instance?.id);
  
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
        password: "",
    },

    validationSchema: UserResetPassInfoValidation,
    onSubmit: async (data) => {
      try {
        await updateInfo(data);
        resetForm();
        enqueueSnackbar("Successfully Reset Password .", {
          variant: "success",
        });
        setOpen(!open);
      } catch (error) {
        enqueueSnackbar(error?.message || "invalid", { variant: "error" });
        // console.log(error);
      }
    },
  });
  return (
    <div>
      <button
        className="btn bg-slate-200 text-xs text-black border border-1 px-2 rounded-2xl py-1 flex items-center gap-2 disabled:bg-slate-400"
        onClick={() => setOpen(!open)}
      >
        Reset Password
      </button>

      <Dialog
        open={open}
        onClose={() => setOpen(!open)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle className="text-black font-semibold text-[24px]">
          Reset Password
        </DialogTitle>

        <form
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
          className="transition-all duration-200  "
        >
          <DialogContent>
            <div className="w-full space-y-5 ">
              <TextField
                fullWidth
                size="medium"
                type="password"
                name="password"
                value={values.password}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                className="w-full"
                onChange={handleChange}
                label="New Password"
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

export default UserPassChangeModal;
