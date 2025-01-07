import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useFormik } from "formik";

import { UserPassInfoValidation } from "@/libs/validation/userFormValidation";
import { useUpdateUserPassword } from "@/hooks/user.hooks";
import { enqueueSnackbar } from "notistack";

const ChangePasswordModal = ({ instance }) => {
  const [open, setOpen] = useState(false);
  // const { mutateAsync } = usePostProductCategory();
  const { mutateAsync: handleUpdateInfo } = useUpdateUserPassword();

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
      current_password: "",
      new_password: "",
    },

    validationSchema: UserPassInfoValidation,
    onSubmit: async (data) => {
      try {
        await handleUpdateInfo(data);
        // console.log(res);
        resetForm();
        enqueueSnackbar("Updated Password.", { variant: "success" });
        setOpen(!open);
      } catch (error) {
        enqueueSnackbar(error?.message, { variant: "error" });
        // console.log(error);
      }
    },
  });
  return (
    <div>
      <button
        className="btn bg-[#2F7CE3] text-white border border-1 px-4 rounded-[10px] py-3 flex items-center gap-2 disabled:bg-slate-400"
        onClick={() => setOpen(!open)}
      >
        Change Password
      </button>

      <Dialog
        open={open}
        onClose={() => setOpen(!open)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle className="text-black font-semibold text-[24px]">
          Update Password
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
                type="password"
                name="current_password"
                value={values.current_password}
                error={
                  touched.current_password && Boolean(errors.current_password)
                }
                helperText={touched.current_password && errors.current_password}
                className="w-full mt-4"
                onChange={handleChange}
                label="Current Password"
              />
              <TextField
                fullWidth
                size="medium"
                type="password"
                name="new_password"
                value={values.new_password}
                error={touched.new_password && Boolean(errors.new_password)}
                helperText={touched.new_password && errors.new_password}
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

export default ChangePasswordModal;
