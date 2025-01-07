import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import AddIcon from "@mui/icons-material/Add";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { enqueueSnackbar } from "notistack";
import { usePostUser, useUpdateUser } from "@/hooks/user.hooks";
import {
  useGETPermjisssion,
  useGETRole,
  useGETRoleByID,
} from "@/hooks/role.hooks";
import {
  UserInfoValidation,
  UserInfoValidationForEdit,
} from "@/libs/validation/userFormValidation";
import { useGETProductCategory } from "@/hooks/product.hook";

const UserForm = ({ instance }) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync } = usePostUser();
  const { mutateAsync: updateInfo } = useUpdateUser(instance?.id);
  const { data } = useGETRole();
  const { data: permissionList } = useGETPermjisssion();
  const { data: categoryList } = useGETProductCategory();

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
      username: instance?.username || "",
      password: "",
      name: instance?.name || "",
      phone: instance?.phone || "",
      email: instance?.email || "",
      roleId: instance?.roleId || "",
      permission: instance?.UserPermission.map((i) => i.permissionId) || [],
      category: instance?.UserPermission.map((i) => i.categoryId) || [],
    },

    validationSchema: instance ? UserInfoValidationForEdit : UserInfoValidation,
    onSubmit: async (data) => {
      try {
        if (instance) {
          await updateInfo(data);
          enqueueSnackbar("Updated user.", { variant: "success" });
        } else {
          data.isActive = true;
          await mutateAsync(data);
          resetForm();
          enqueueSnackbar("Added new user.", { variant: "success" });
        }

        setOpen(!open);
      } catch (error) {
        // console.log(error?.message, error?.message == "Error: P2002", "555");
        enqueueSnackbar(
          error?.message == "Error: P2002"
            ? "This username is already taken! Try another."
            : error?.message,
          { variant: "error" }
        );
      }
    },
  });
  const { data: getRoleInfo } = useGETRoleByID(values?.roleId);

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
          Add New User
          <AddIcon />
        </button>
      )}
      <div>
        <Dialog
          open={open}
          onClose={() => setOpen(!open)}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle className="text-black font-semibold text-[24px]">
            {instance ? "Edit User" : "Add User"}
          </DialogTitle>

          <form
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
            className="transition-all duration-200  "
          >
            <DialogContent>
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <TextField
                    fullWidth
                    size="small"
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
                    size="small"
                    name="phone"
                    value={values.phone}
                    error={touched.phone && Boolean(errors.phone)}
                    helperText={touched.phone && errors.phone}
                    className="w-full"
                    onChange={handleChange}
                    label="Phone Number"
                  />
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <TextField
                    fullWidth
                    type="email"
                    size="small"
                    name="email"
                    value={values.email}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    className="w-full"
                    onChange={handleChange}
                    label="Email"
                  />
                  <FormControl
                    fullWidth
                    size="small"
                    className="w-full"
                    error={touched.roleId && Boolean(errors.roleId)}
                  >
                    <InputLabel>Role</InputLabel>
                    <Select
                      name="roleId"
                      value={values.roleId}
                      label="Role"
                      onChange={(e) => {
                        setFieldValue("roleId", e.target.value);
                        setFieldValue("permission", []);
                        setFieldValue("category", []);
                      }}
                    >
                      <MenuItem value={""}>Select Role</MenuItem>
                      {data &&
                        data.map((i) => (
                          <MenuItem key={i.id} value={i.id}>
                            {i.title}
                          </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>
                      {touched.roleId && errors.roleId}
                    </FormHelperText>
                  </FormControl>
                </div>
                <div className=" grid grid-cols-2 gap-5">
                  <TextField
                    fullWidth
                    size="small"
                    name="username"
                    value={values.username}
                    error={touched.username && Boolean(errors.username)}
                    helperText={touched.username && errors.username}
                    className="w-full"
                    onChange={handleChange}
                    label="User Name"
                  />
                  {!instance && (
                    <TextField
                      fullWidth
                      size="small"
                      type="password"
                      name="password"
                      value={values.password}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                      className="w-full"
                      onChange={handleChange}
                      label="Password"
                    />
                  )}
                </div>
                <hr />
                {permissionList && getRoleInfo && (
                  <h2 className="font-bold mb-4 mt-7 text-2xl">Permission</h2>
                )}
                <div className="grid grid-cols-2 gap-7">
                  {permissionList &&
                    getRoleInfo &&
                    permissionList.map((permision) => {
                      return (
                        <label
                          key={Math.random()}
                          htmlFor={"permission" + permision?.id}
                          className={`text-lg capitalize`}
                        >
                          <input
                            disabled={getRoleInfo?.RolePermission?.map(
                              (i) => i.permissionId
                            ).includes(permision?.id)}
                            checked={
                              getRoleInfo?.RolePermission?.map(
                                (i) => i.permissionId
                              ).includes(permision?.id) ||
                              values.permission.includes(permision?.id)
                            }
                            // includes
                            onChange={(e) => {
                              let _ = values.permission;
                              values.permission.push(permision?.id);
                              if (e.target.checked) {
                                _.push(permision?.id);
                                _ = [...new Set(_)];
                              } else {
                                _ = _.filter((item) => item !== permision?.id);
                              }
                              setFieldValue("permission", _);
                            }}
                            type="checkbox"
                            id={"permission" + permision?.id}
                          />{" "}
                          {permision?.title}
                        </label>
                      );
                    })}
                </div>
                {categoryList && getRoleInfo && (
                  <h2 className="font-bold mb-4 mt-7 text-2xl">
                    Category Permission
                  </h2>
                )}
                <div className="grid grid-cols-2 gap-7">
                  {categoryList &&
                    getRoleInfo &&
                    categoryList.map((categoryInfo) => (
                      <label
                        key={categoryInfo.id}
                        htmlFor={"cat_permission" + categoryInfo.id}
                        className="text-lg"
                      >
                        <input
                          disabled={getRoleInfo?.RolePermission?.map(
                            (i) => i.categoryId
                          ).includes(categoryInfo?.id)}
                          checked={
                            getRoleInfo?.RolePermission?.map(
                              (i) => i.categoryId
                            ).includes(categoryInfo?.id) ||
                            values.category.includes(categoryInfo?.id)
                          }
                          onChange={(e) => {
                            let _ = values.category;
                            if (e.target.checked) {
                              _.push(categoryInfo?.id);
                              _ = [...new Set(_)];
                            } else {
                              _ = _.filter((item) => item !== categoryInfo?.id);
                            }
                            setFieldValue("category", _);
                          }}
                          type="checkbox"
                          id={"cat_permission" + categoryInfo.id}
                        />{" "}
                        {categoryInfo?.title}
                      </label>
                    ))}
                </div>
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

export default UserForm;
